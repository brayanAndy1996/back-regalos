import { response } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/users";

const getUsers = async(req, res) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const query = { estado: true };
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('role', 'name')
                .populate('ambienteActual', 'name')
        ]);
        res.status(200).json({
            total,
            usuarios
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: ['No se pudo obtener los usuarios de la base de datos']
        });
    }
}

const createUser = async (req, res = response) => {
    try {
        const { nroDoc, tipoDoc, nombreCom, role, email, password, telefono, direccion, fechaNac, sexo, ambienteActual  } = req.body;
        const usuario = new Usuario({ nroDoc, tipoDoc, nombreCom, role, email, password, telefono, direccion, fechaNac, sexo, ambienteActual });
        
        //Encriptar la contraseña
        if(password){
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password, salt);
        }
        
        //Guardar en DB
        await usuario.save();
        const newUser = await Usuario.findOne({nroDoc, tipoDoc})
                                .populate('role', 'name')
                                .populate('ambienteActual', 'name')
        
        res.status(200).json(newUser);
    } catch (error) {
        console.log("🚀 ~ createUser ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo guardar el usuario en la base de datos']
        });
    }
}

const updateUser = async (req, res = response) => {
    try {
        const { nroDocParam, tipoDocParam } = req.params;
        const { password, nroDoc, tipoDoc, ...resto } = req.body;
        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }
        const usuario = await Usuario.findOneAndUpdate({nroDoc: nroDocParam, tipoDoc: tipoDocParam}, resto)
                                    .populate('ambienteActual', 'name')
                                    .populate('role', 'name');
        res.status(200).json({
            usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: ['No se pudo actualizar el usuario en la base de datos']
        });
    }
}

const deleteUser = async (req, res = response) => {
    try {
        const { nroDocParam, tipoDocParam } = req.params;
        const usuario = await Usuario.findOneAndUpdate({nroDoc: nroDocParam, tipoDoc: tipoDocParam}, {estado: false})
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: ['No se pudo eliminar el usuario en la base de datos']
        });
    }
}

export {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}