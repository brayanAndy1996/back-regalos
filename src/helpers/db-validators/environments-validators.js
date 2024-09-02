import environment from "../../models/environment";

const isValidateEnvironmentExist = async (name) => {
    const environmentExist = await environment.findOne({ name: name.toUpperCase() });
    if (environmentExist) {
        throw new Error(`El ambiente con el nombre: ${name.toUpperCase()} ya existe existe`);
    }
}

const isValidateEnvironmentExistById = async (id) => {
    const environmentExist = await environment.findById( id )
    if (!environmentExist) {
        throw new Error(`El ambiente con el id: ${id} no existe`);
    }
}

export {
    isValidateEnvironmentExist,
    isValidateEnvironmentExistById
}