import { response } from "express";
import Producto from "../models/producto";
import Usuario from "../models/users";

const getUsers = async (req, res) => {
  // try {
  //     const { from = 0, limit = 5 } = req.query;
  //     const query = { estado: true };
  //     const [total, usuarios] = await Promise.all([
  //         Usuario.countDocuments(query),
  //         Usuario.find(query)
  //             .skip(Number(from))
  //             .limit(Number(limit))
  //             .populate('role', 'name')
  //             .populate('ambienteActual', 'name')
  //     ]);
  //     res.status(200).json({
  //         total,
  //         usuarios
  //     });
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo obtener los usuarios de la base de datos']
  //     });
  // }
};
const getProductos = async (req, res) => {
  try {
    const { categoria, emailUser } = req.query;
    const match = {
      estado: true 
      // precio: { $gte: 0, $lte: 120 }, // Rango de precios
    }
    if(categoria) match['categoria.nombre'] = categoria

    if(emailUser){
     const usuario = await Usuario.findOne({email:emailUser}); 
     
     if (!usuario) {
       return res.status(404).json({
         errors: ["Usuario no encontrado"]
       });
     }
     match['_id'] = { $in: usuario.productsFavorites }
    }

    const primalQuery = [
      // {
      //   $match: {
      //     _id: { $in: Usuario.productsFavorites } // Filtrar por los IDs en productsFavorites
      //   }
      // },
      {
        $lookup: {
          from: 'multimediaproductos', // Nombre de la colección multimedia en tu base de datos
          localField: '_id', // Campo en la colección productos
          foreignField: 'producto', // Campo en la colección multimedia
          as: 'movimientos', // Nombre del array resultante
        },
      },
      {
        $lookup: {
          from: 'categorias', // Nombre de la colección categorías en tu base de datos
          localField: 'categoria', // Campo en la colección productos (referencia de categoría)
          foreignField: '_id', // Campo en la colección categorías
          as: 'categoria', // Nombre del array resultante
        },
      },
      {
        $unwind: {
          path: '$categoria', // Descomponer el array de categorías en un objeto
          preserveNullAndEmptyArrays: false, // Si no hay categoría, no elimina el documento
        },
      },
      {
        $match: match
      }
    ]

    const queryCount =  Producto.aggregate([...primalQuery,
      {
        $count: 'total', // Contar los resultados
      }])

    const queryGetProductos = Producto.aggregate(primalQuery)

    const [total, productos] = await Promise.all([queryCount,  queryGetProductos])

    res.status(200).json({
      total:total[0]?.total ?? 0,
      productos
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: ["No se pudo obtener los productos de la base de datos"],
    });
  }
};

const createProducto = async (req, res = response) => {
  try {
    const {
      nombre,
      precio,
      descripcion,
      stock,
      porcentajeDescuento,
      estado,
      categoria,
    } = req.body;
    const producto = new Producto({
      nombre,
      precio,
      descripcion,
      stock,
      porcentajeDescuento,
      estado,
      categoria,
    });
    await producto.save();
    const newProducto = await Producto.findOne({ nombre }).populate(
      "categoria",
      "nombre"
    );

    res.status(200).json(newProducto);
  } catch (error) {
    console.log("🚀 ~ createProducto ~ error:", error);
    const errorsValues = Object.values(error.errors)?.map(
      (error) => error.properties?.message
    );
    res.status(500).json({
      errors: errorsValues ?? [
        "No se pudo guardar el usuario en la base de datos",
      ],
    });
  }
};

const updateProduct = async (req, res = response) => {
  try {
    const { idProduct } = req.params;
      console.log("🚀 ~ updateProduct ~ idProduct:", idProduct)
      const { precio, descripcion, stock, porcentajeDescuento } = req.body;
      const newProduct = {precio, descripcion, stock, porcentajeDescuento }
      const productUpdate = await Producto.findOneAndUpdate({_id: idProduct}, newProduct, { new:true })
      console.log("🚀 ~ updateProduct ~ newProduct:", newProduct)
      res.status(200).json({
        productUpdate
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errors: ['No se pudo actualizar el producto en la base de datos']
      });
  }
};

const deleteUser = async (req, res = response) => {
  // try {
  //     const { email } = req.params;
  //     const usuario = await Usuario.findOneAndUpdate({ email }, {estado: false})
  //     res.status(200).json(usuario);
  // } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //         errors: ['No se pudo eliminar el usuario en la base de datos']
  //     });
  // }
};

export { createProducto, getUsers, getProductos, updateProduct, deleteUser };
