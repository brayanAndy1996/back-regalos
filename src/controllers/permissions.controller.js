import { response } from "express";
import Permission from "../models/Permission";

const getAllPermissions = async (req, res = response) => {
    try {
        const permissions = await Permission.find()
        res.status(200).json(permissions);
    }catch (error) {
        console.log("🚀 ~ getPermissions ~ error:", error)
        res.status(500).json({
            errors: ['No se pudieron obtener los permisos']
        });
    }
}

const createPermission = async (req, res = response) => {
    try {
        const { name, code, description } = req.body;
        const data = {
            name,
            code,
            description:description.toUpperCase()
        }
        const permissionNew = new Permission(data);
        await permissionNew.save();
        res.status(200).json(permissionNew);
    }catch (error) {
        console.log("🚀 ~ createPermission ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo guardar el permiso en la base de datos']
        });
    }
}

const updatePermission = async (req, res = response) => {
    try {
        const { codeParam } = req.params;
        const permissionDB = await Permission.findOne({ code: codeParam });
        if (!permissionDB) {
            return res.status(404).json({
                errors: [`El permiso ${codeParam} que quieres actualizar no existe`]
            });
        }
        const { name, description } = req.body;
        const data = {
            name,
            description:description.toUpperCase()
        }
        const permisoActualizado = await Permission.findOneAndUpdate({code: codeParam}, data)
        res.status(200).json({
            name: name || permisoActualizado.name, 
            description: description || permisoActualizado.description,
            code: codeParam
        });
    }catch (error) {
        console.log("🚀 ~ createPermission ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo actualizar el permiso en la base de datos']
        });
    }
}

const deletePermission = async (req, res = response) => {
    try {
        const { codeParam } = req.params;
        const permissionDB = await Permission.findOne({ code: codeParam });
        if (!permissionDB) {
            return res.status(404).json({
                errors: [`El permiso ${codeParam} que quieres eliminar no existe`]
            });
        }
        const permissionDelete = await Permission.deleteOne({code: codeParam})
        res.status(200).json(permissionDelete)
    } catch (error) {
        console.log("🚀 ~ deletePermission ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo eliminar el permiso en la base de datos']
        });
    }
}

export {
    createPermission,
    getAllPermissions,
    updatePermission,
    deletePermission
}