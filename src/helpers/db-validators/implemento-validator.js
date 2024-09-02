import Implemento from "../../models/implemento";

const isImplementoExist = async( name = '' ) =>{
    if(!name) return
    const implemento = await Implemento.findOne({ name })
    if( implemento ) throw new Error(`El implemento ${ name } ya está registrado`)
}

const areImplementosNoExistById = async( ids ) =>{
    if(!ids) return
    const idsTest = ids.map( async(id)=>{
        const implemento = await Implemento.findById(id)
        if( !implemento ) throw new Error(`El implemento ${ id } no existe`)
    } )
    await Promise.all(idsTest)
}

const isImplementoExistById = async( id ) => {
    const implemento = await Implemento.findById(id)
    if( !implemento ) throw new Error(`El implemento ${ id } no existe`)
}

export {
    isImplementoExist,
    areImplementosNoExistById,
    isImplementoExistById
}