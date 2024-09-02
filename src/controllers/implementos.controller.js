import { response } from "express";
import Implemento from "../models/implemento";

const getImplementos = async(req, res) => {
  try {
      const { from = 0, limit = 5 } = req.query;
      const query = { estado: true };
      const [total, implementos] = await Promise.all([
        Implemento.countDocuments(query),
        Implemento.find(query)
              .skip(Number(from))
              .limit(Number(limit))
      ]);
      res.status(200).json({
          total,
          implementos
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errors: ['No se pudo obtener los implementos de la base de datos']
      });
  }
}
const getAllImplementos = async (req, res = response) => {
  try {
    const implemento = await Implemento.find({ estado: true });
    res.status(200).json(implemento);
  } catch (error) {
    console.log("🚀 ~ getAllImplementos ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener los implementos de la base de datos"],
    });
  }
};

const createImplementos = async (req, res = response) => {
  try {
    const { name, precio, description, stock } = req.body;
    const implemento = new Implemento({ name, precio, description, stock });
    await implemento.save();
    const implementoCreado = await Implemento.findOne({ name });
    if (implementoCreado) res.status(200).json(implementoCreado);
    else
      res.status(500).json({
        errors: [`No se pudo crear el implemento ${name}`],
      });
  } catch (error) {
    console.log("🚀 ~ createImplementos ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo crear el implemento"],
    });
  }
};

const updateImplemento = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { name, precio, description, stock } = req.body;
    const implementoActualizado = await Implemento.findByIdAndUpdate(
      id,
      { name, precio, description, stock },
      { new: true }
    );
    res.status(200).json(implementoActualizado);
  } catch (error) {
    console.log("🚀 ~ updateImplemento ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo actualizar el implemento en la base de datos"],
    });
  }
};

const deleteImplemento = async (req, res = response) => {
  try {
    const { id } = req.params;
    const implementoEliminado = await Implemento.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.status(200).json(implementoEliminado);
  } catch (error) {
    console.log("🚀 ~ updateImplemento ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo eliminar el implemento en la base de datos"],
    });
  }
};

export { getAllImplementos, createImplementos, updateImplemento, deleteImplemento, getImplementos }
