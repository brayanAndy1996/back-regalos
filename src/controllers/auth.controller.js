import { response } from "express";
import { generateJWT } from "../helpers/generate-jwt";
import bcryptjs from "bcryptjs";
import Usuario from "../models/users";

const loginController = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verificdar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res
        .status(400)
        .json({ msg: "Usuario/ password no son correctos- correo" });
    //si el usuario esta activo
    if (!usuario.estado)
      return res
        .status(400)
        .json({ msg: "Usuario/ password no son correctos- estado:false" });
    //Verificar la contraseñla
    const validatePassword = bcryptjs.compareSync(password, usuario.password);
    if (!validatePassword)
      return res
        .status(400)
        .json({ msg: "Usuario/ password no son correctos- password" });
    //Generar el jwt
    const token = await generateJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.controller.js:10 ~ loginController ~ error:",
      error
    );
    return res.status(500).json({
      msg: "Algo salio mal :(",
    });
  }
};

export { loginController };
