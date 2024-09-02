import { response } from "express";
import { validationResult } from "express-validator";
import Plan from "../models/plan";

const isPlanExist = async (req, res = response, next) => {
  try {
    const { name, precio, duration, ambiente } = req.body;
    const plan = await Plan.findOne({ name, precio, duration, ambiente });
    if (plan) {
      return res.status(400).json({
        errors: ["El plan ya existe"],
      });
    }
    next();
  } catch (error) {
    console.log("🚀 ~ isImplementoNoExist ~ error:", error);
    return res.status(500).json({
      errors: ["Hubo un error al verificar el plan"],
    });
  }
}

const isPlanNoExist = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById( id )
    if (!plan) {
      return res.status(400).json({
        errors: ["El plan no existe"]
      });
    }
    next();
  } catch (error) {
    console.log("🚀 ~ isImplementoNoExist ~ error:", error);
    return res.status(500).json({
      errors: ["Hubo un error al verificar el plan"],
    });
  }
};

const isPlanExistById = async (req, res = response, next) => {
  try {
    const { name, precio, duration, ambiente } = req.body;
    const { id } = req.params;
    const planNow = await Plan.findById(id);
    const valueEdit = {
      name: name ?? planNow.name,
      precio: precio ?? planNow.precio,
      duration: duration ?? planNow.duration,
      ambiente: ambiente ?? planNow.ambiente,
    };
    const plan = await Plan.findOne(valueEdit);
    if (plan && (!planNow?._id?.equals(plan?._id))) {
      return res.status(400).json({
        errors: ["El plan ya existe"],
      });
    }
    next();
  } catch (error) {
    console.log("🚀 ~ isImplementoNoExist ~ error:", error);
    const errors = validationResult(req);
    const errorsMessage = errors.array()?.map(error => error.msg)
    return res.status(500).json({
      errors: [...errorsMessage,"Hubo un error al verificar el plan"],
    });
  }
};

export { isPlanExist, isPlanExistById, isPlanNoExist };
