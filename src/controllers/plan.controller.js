import { response } from "express";
import Plan from "../models/plan";

const getPlan = async(req, res) => {
  try {
      const { from = 0, limit = 5 } = req.query;
      const query = { estado: true };
      const [total, planes] = await Promise.all([
        Plan.countDocuments(query),
        Plan.find(query)
              .skip(Number(from))
              .limit(Number(limit))
              .populate('implementos', 'name')
              .populate('ambiente', 'name')
      ]);
      res.status(200).json({
          total,
          planes
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errors: ['No se pudo obtener los planes de la base de datos']
      });
  }
}
const getAllPlanes = async (req, res = response) => {
  try {
    const planes = await Plan.find({ estado: true })
                                .populate('implementos', 'name')
                                .populate('ambiente', 'name')
    res.status(200).json(planes);
  } catch (error) {
    console.log("🚀 ~ getAllPlanes ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener los planes de la base de datos"],
    });
  }
};

const createPlan = async (req, res = response) => {
  try {
    const { name, precio, description, duration, ambiente, implementos } = req.body;
    const plan = new Plan({ name, precio, description, duration, ambiente, implementos });
    await plan.save();
    const planCreado = await Plan.findOne({ name, precio, duration, ambiente });
    if (planCreado) res.status(200).json(planCreado);
    else
      res.status(500).json({
        errors: [`No se pudo crear el plan ${name}`]
      });
  } catch (error) {
    console.log("🚀 ~ createPlan ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo crear el plan"]
    });
  }
};

const updatePlan = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { name, precio, description, duration, ambiente, implementos } = req.body;
    const planActualizado = await Plan.findByIdAndUpdate(
      id,
      { name, precio, description, duration, ambiente, implementos },
      { new: true }
    );
    res.status(200).json(planActualizado);
  } catch (error) {
    console.log("🚀 ~ updatePlan ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo actualizar el implemento en la base de datos"]
    });
  }
};

const deletePlan = async (req, res = response) => {
  try {
    const { id } = req.params;
    const planEliminado = await Plan.findByIdAndDelete(id)
    res.status(200).json(planEliminado);
  } catch (error) {
    console.log("🚀 ~ updatePlan ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo eliminar el plan en la base de datos"],
    });
  }
};

export { getAllPlanes, createPlan, updatePlan, deletePlan, getPlan }
