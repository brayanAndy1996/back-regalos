import { response } from "express";
import Environment from "../models/environment";
import { assingADateToTime } from "../helpers/transformDates";

const getAllEnvironments = async (req, res = response) => {
  try {

    const environments = await Environment.find().populate("tutor", "name");
    res.status(200).json(environments)

  } catch (error) {
    console.log("🚀 ~ getEnvironments ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener los ambientes de la base de datos"],
    });
  }
};

const getEnvironments = async (req, res = response) => {
  try {

    const { from = 0, limit = 5 } = req.query;
    
    const req1 = Environment.countDocuments()
    const req2 = Environment.find()
      .skip(Number(from))
      .limit(Number(limit))
      .populate("tutor", "name");

    const [total, environments] = await Promise.all([req1, req2])

    res.status(200).json({
      total,
      environments,
    })

  } catch (error) {
    console.log("🚀 ~ getEnvironments ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener los ambientes de la base de datos"],
    });
  }
};

const createEnvironment = async (req, res = response) => {
  try {
    const {
      name,
      description,
      entryTime,
      departureTime,
      area,
      location,
      tutor,
      daysClases,
      maximiumStudents,
    } = req.body

    const data = {
      name: name?.toUpperCase(),
      description: description?.toUpperCase(),
      entryTime: assingADateToTime(entryTime),
      departureTime: assingADateToTime(departureTime),
      area: area?.toUpperCase(),
      location: location?.toUpperCase(),
      daysClases,
      maximiumStudents,
      tutor,
    }

    const environmentNew = new Environment(data);
    await environmentNew.save()

    res.status(200).json(environmentNew)
  } catch (error) {
    console.log("🚀 ~ createEnvironment ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo guardar el ambiente en la base de datos"],
    });
  }
};

const updateEnvironment = async (req, res = response) => {
  try {
    const { id } = req.params;

    const environmentExist = await Environment.findById(id);

    if (!environmentExist) {
      return res.status(400).json({
        errors: ["El ambiente que intenta actualizar no existe"],
      });
    }

    const {
      description,
      entryTime,
      departureTime,
      area,
      location,
      tutor,
      daysClases,
      maximiumStudents,
    } = req.body;

    const data = {
      description: description?.toUpperCase(),
      entryTime: assingADateToTime(entryTime),
      departureTime: assingADateToTime(departureTime),
      area: area?.toUpperCase(),
      location: location?.toUpperCase(),
      daysClases,
      maximiumStudents,
      tutor,
    }

    const environmentUpdate = await Environment.findByIdAndUpdate(id, data, {
      new: true,
    })

    res.status(200).json(environmentUpdate)

  } catch (error) {
    console.log("🚀 ~ updateEnvironment ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo actualizar el ambiente en la base de datos"],
    });
  }
};

const deleteEnvironment = async (req, res = response) => {
  try {
    const { id } = req.params;
    const environmentExist = await Environment.findById(id);
    if (!environmentExist) {
      return res.status(400).json({
        errors: ["El ambiente que intenta eliminar no existe"],
      });
    }
    const environmentElimnated = await Environment.findByIdAndDelete(id);
    res.status(200).json(environmentElimnated);
  } catch (error) {
    console.log("🚀 ~ deleteEnvironment ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo eliminar el ambiente en la base de datos"],
    });
  }
};

export {
  createEnvironment,
  getAllEnvironments,
  updateEnvironment,
  deleteEnvironment,
  getEnvironments,
};
