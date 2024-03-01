import Permission from "../../models/Permission";

const isValidatePermissionExist = async ( code ) => {
    console.log("🚀 ~ isValidatePermissionExist ~ code:", code)
    const permissionDB = await Permission.findOne({ code });
    console.log("🚀 ~ isValidatePermissionExist ~ permissionDB:", permissionDB)
    if (permissionDB) {
        throw new Error('El permiso ya existe');
    }
}

export {
    isValidatePermissionExist
}