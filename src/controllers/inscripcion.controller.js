import { response } from "express";
import Inscripcion from "../models/inscripcion";
import dayjs from "dayjs";
import { convertToDateTimeInternational } from "../helpers/transformDates";

const getInscripciones = async(req, res) => {
  try {
      
    const { from = 0, limit = 5, startDate = '', endDate = '', precio, duration, alumno, matriculo, ambiente, implementos } = req.query;
    const startDateUTC = convertToDateTimeInternational(startDate)
    const endDateUTC = convertToDateTimeInternational(endDate)
    const todayLastHour = dayjs().endOf('day').format()
    const query = { fechaInscrita: { $gte: '1970-01-01', $lte: todayLastHour }, estado: true }
    if(startDateUTC) query.fechaInscrita = { ...query.fechaInscrita, $gte: startDateUTC }
    if(endDateUTC) query.fechaInscrita = { ...query.fechaInscrita, $lte: dayjs(endDateUTC).endOf('day').format() }
    if(precio) query.precio = precio
    if(duration) query.duration = duration
    if(alumno) query.alumno = alumno
    if(matriculo) query.matriculo = matriculo
    if(ambiente) query.ambiente = ambiente
    if(implementos) query.implementos = implementos
    console.log("🚀 ~ getMovimiento ~ query:", query)
    
    const [total, movimientos] = await Promise.all([
      Inscripcion.countDocuments(query),
      Inscripcion.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('alumno', 'nombreCom')
                .populate('matriculo', 'nombreCom')
                .populate('ambiente', 'name')
                .populate('implementos', 'name')
    ])
      res.status(200).json({
          total,
          movimientos
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errors: ['No se pudo obtener la inscripcion de la base de datos']
      });
  }
}

const getAllInscripciones = async (req, res = response) => {
  try {
    const inscripciones = await Inscripcion.find({ estado: true })
                                .populate('alumno', 'nombreCom')
                                .populate('matriculo', 'nombreCom')
                                .populate('ambiente', 'name')
                                .populate('implementos', 'name')

    res.status(200).json(inscripciones);
  } catch (error) {
    console.log("🚀 ~ getAllInscripciones ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener las inscripciones de la base de datos"],
    });
  }
};

const createInscripcion = async (req, res = response) => {
  try {
    const { precio, duration, alumno, matriculo, ambiente, implementos } = req.body;
    const movimientoCreado = new Inscripcion({ precio, duration, alumno, matriculo, ambiente, implementos });
    await movimientoCreado.save();
    res.status(200).json({ precio, duration, alumno, matriculo, ambiente, implementos });
  } catch (error) {
    console.log("🚀 ~ createPlan ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo crear la inscripción"]
    });
  }
};

const updateInscripcion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { precio, duration, alumno, matriculo, ambiente, implementos } = req.body;
    const inscripcionActualizado = await Inscripcion.findByIdAndUpdate(
      id,
      { precio, duration, alumno, matriculo, ambiente, implementos },
      { new: true }
    );
    res.status(200).json(inscripcionActualizado);
  } catch (error) {
    console.log("🚀 ~ updateInscripcion ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo actualizar la inscripcion en la base de datos"]
    });
  }
};

const deleteInscripcion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const inscripcionEliminada = await Inscripcion.findByIdAndUpdate(id, { estado: false })
    res.status(200).json(inscripcionEliminada);
  } catch (error) {
    console.log("🚀 ~ deleteInscripcion ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo eliminar la inscripcion en la base de datos"],
    });
  }
};

export { getAllInscripciones, createInscripcion, updateInscripcion, deleteInscripcion, getInscripciones }