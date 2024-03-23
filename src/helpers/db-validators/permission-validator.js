import permission from '../../models/permission'

const isValidatePermissionExist = async ( code ) => {
    const permissionDB = await permission.findOne({ code });
    if (permissionDB) {
        throw new Error('El permiso ya existe');
    }
}

export {
    isValidatePermissionExist
}