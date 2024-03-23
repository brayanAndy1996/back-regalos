import environment from "../../models/environment";

const isValidateEnvironmentExist = async (name) => {
    const environmentExist = await environment.findOne({ name: name.toUpperCase() });
    if (environmentExist) {
        throw new Error(`El ambiente con el nombre: ${name.toUpperCase()} ya existe existe`);
    }
}

export {
    isValidateEnvironmentExist
}