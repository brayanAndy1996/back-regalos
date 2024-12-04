import { response } from "express";
import Categoria from "../models/categoria";

const getUsers = async (req, res) => {
  // try {
  //     const { from = 0, limit = 5 } = req.query;
  //     const query = { estado: true };
  //     const [total, usuarios] = await Promise.all([
  //         Usuario.countDocuments(query),
  //         Usuario.find(query)
  //             .skip(Number(from))
  //             .limit(Number(limit))
  //             .populate('role', 'name')
  //             .populate('ambienteActual', 'name')
  //     ]);
  //     res.status(200).json({
  //         total,
  //         usuarios
  //     });
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo obtener los usuarios de la base de datos']
  //     });
  // }
};
const getAllUsers = async (req, res) => {
  // try {
  //     const query = { estado: true };
  //     const [total, usuarios] = await Promise.all([
  //         Usuario.countDocuments(query),
  //         Usuario.find(query)
  //             .populate('role', 'name')
  //     ]);
  //     res.status(200).json({
  //         total,
  //         usuarios
  //     });
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo obtener los usuarios de la base de datos']
  //     });
  // }
};

const createCategoria = async (req, res = response) => {
  try {
    const { nombre, descripcion, modulo, icono } = req.body;
    const categoria = new Categoria({ nombre, descripcion, modulo, icono });
    await categoria.save();
    const newProducto = await Categoria.findOne({ nombre });

    res.status(200).json(newProducto);
  } catch (error) {
    console.log("🚀 ~ createProducto ~ error:", error);
    const errorsValues = Object.values(error.errors)?.map(error => error.properties?.message)
    res.status(500).json({
      errors: errorsValues ?? ["No se pudo guardar el usuario en la base de datos"],
    });
  }
};

const updateUser = async (req, res = response) => {
  // try {
  //     const { email } = req.params;
  //     const { password, email: email2, ...resto } = req.body;
  //     if(password){
  //         const salt = bcryptjs.genSaltSync();
  //         resto.password = bcryptjs.hashSync(password, salt);
  //     }
  //     const usuario = await Usuario.findOneAndUpdate({ email }, resto)
  //                                 .populate('role', 'name');
  //     res.status(200).json({
  //         usuario
  //     });
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo actualizar el usuario en la base de datos']
  //     });
  // }
};

const deleteUser = async (req, res = response) => {
  // try {
  //     const { email } = req.params;
  //     const usuario = await Usuario.findOneAndUpdate({ email }, {estado: false})
  //     res.status(200).json(usuario);
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo eliminar el usuario en la base de datos']
  //     });
  // }
};

export { createCategoria };
