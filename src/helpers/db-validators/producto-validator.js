import Producto from '../../models/producto';

const validateProductExistByNombre = async ( nombre = '' ) => {
    if ( !nombre ) return
        
    const producto = await Producto.findOne({ nombre })
    if ( producto )  throw new Error(`El producto ${ nombre } ya está registrado`)
}


export {
    validateProductExistByNombre
}