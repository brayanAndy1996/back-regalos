import Permission from "../../models/Permission";

const isValidatePermissionExist = async ( code ) => {
    const permissionDB = await Permission.findOne({ code });
    if (permissionDB) {
        throw new Error('El permiso ya existe');
    }
}

export {
    isValidatePermissionExist
}