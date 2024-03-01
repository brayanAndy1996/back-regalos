import { response } from "express";
import Role from "../models/role";

const getAllRoles = async (req, res = response) => {
    try {
        const roles = await Role.find()
                                .populate('permissions', 'name code')
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({
            errors: ['No se pudieron obtener los roles']
        })
    }
}

const createRole = async (req, res = response) => {
    try {
        const { name, code, description, permissions } = req.body;
        const data = {
            name,
            code,
            description: description?.toUpperCase(),
            permissions
        }
        const roleNew = new Role(data);
        await roleNew.save();
        res.status(200).json(roleNew);
    } catch (error) {
        console.log("🚀 ~ createRole ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo guardar el rol en la base de datos']
        });
    }
}

const updateRole = async (req, res = response) => {
    try {
        const { codeParam } = req.params; 
        const existeRole = await Role.findOne({ code: codeParam })
        if ( !existeRole ) {
            return res.status(404).json({
                errors: [`El rol ${ codeParam } que quieres actualizar no existe`]
            });
        }
        const { name, description, permissions } = req.body;
        const data = {
            name,
            description: description?.toUpperCase(),
            permissions
        }
        const roleUpdate = await Role.findOneAndUpdate({ code: codeParam }, data)
        res.status(200).json({ 
            name: name || roleUpdate.name, 
            code: codeParam, 
            description: description || roleUpdate.description,
            permissions: permissions || roleUpdate.permissions
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: ['No se pudo actualizar el rol en la base de datos']
        });
    }
}

const deleteRole = async (req, res = response) => {
    try {
        const { codeParam } = req.params;
        const existeRole = await Role.findOne({ code: codeParam })
        if ( !existeRole ) {
            return res.status(404).json({
                errors: [`El rol ${ codeParam } que quieres eliminar no existe`]
            });
        }
        const roleDelete = await Role.deleteOne({ code: codeParam })
        res.status(200).json(roleDelete)
    } catch (error) {
        res.status(500).json({
            errors: ['No se pudo eliminar el rol en la base de datos']
        });
    }
}

export {
    getAllRoles,
    createRole,
    updateRole,
    deleteRole
}