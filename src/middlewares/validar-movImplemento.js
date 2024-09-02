import { response } from "express";
import { validationResult } from "express-validator";
import MovImplemento from "../models/movImplemento";


const isMovimientoNoExistById = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const movimiento = await MovImplemento.findById(id);
    if (!movimiento) {
      return res.status(400).json({
        errors: ["El movimiento no ya existe"],
      });
    }
    next();
  } catch (error) {
    console.log("🚀 ~ isImplementoNoExist ~ error:", error);
    const errors = validationResult(req);
    const errorsMessage = errors.array()?.map(error => error.msg)
    return res.status(500).json({
      errors: [...errorsMessage,"Hubo un error al verificar el movimiento"],
    });
  }
};

export { isMovimientoNoExistById };
