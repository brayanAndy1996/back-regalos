import role from "../../models/role";

const isValidateRoleExist = async ( code ) => {
    const existeRole = await role.findOne({ code })
    if ( existeRole ) throw new Error(`El rol ${ code } ya está registrado`)
}


export {
    isValidateRoleExist
}