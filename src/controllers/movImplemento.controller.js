import { response } from "express";
import MovImplemento from "../models/movImplemento";
import dayjs from "dayjs";
import { convertToDateTimeInternational } from "../helpers/transformDates";

const getMovimiento = async(req, res) => {
  try {
      
    const { from = 0, limit = 5, startDate = '', endDate = '', cantidad='', tipoMovimiento='', usuario='', implemento='' } = req.query;
    const startDateUTC = convertToDateTimeInternational(startDate)
    const endDateUTC = convertToDateTimeInternational(endDate)
    const todayLastHour = dayjs().endOf('day').format()
    const query = { fechaMovimiento: { $gte: '1970-01-01', $lte: todayLastHour } }
    if(startDateUTC) query.fechaMovimiento = { ...query.fechaMovimiento, $gte: startDateUTC }
    if(endDateUTC) query.fechaMovimiento = { ...query.fechaMovimiento, $lte: dayjs(endDateUTC).endOf('day').format() }
    if(cantidad) query.cantidad = cantidad
    if(tipoMovimiento) query.tipoMovimiento = tipoMovimiento
    if(usuario) query.usuario = usuario
    if(implemento) query.implemento = implemento
    console.log("🚀 ~ getMovimiento ~ query:", query)
    
    const [total, movimientos] = await Promise.all([
        MovImplemento.countDocuments(query),
        MovImplemento.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('usuario', 'nombreCom')
                .populate('implemento', 'name')
    ])
      res.status(200).json({
          total,
          movimientos
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errors: ['No se pudo obtener los planes de la base de datos']
      });
  }
}

const getAllMovimientos = async (req, res = response) => {
  try {
    const moviemientos = await MovImplemento.find()
                                .populate('usuario', 'nombreCom')
                                .populate('implemento', 'name')
    res.status(200).json(moviemientos);
  } catch (error) {
    console.log("🚀 ~ getAllPlanes ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo obtener las operaciones de la base de datos"],
    });
  }
};

const createMovimiento = async (req, res = response) => {
  try {
    const { cantidad, tipoMovimiento, usuario, implemento } = req.body;
    const movimientoCreado = new MovImplemento({ cantidad, tipoMovimiento, usuario, implemento });
    await movimientoCreado.save();
    res.status(200).json({ cantidad, tipoMovimiento, usuario, implemento });
  } catch (error) {
    console.log("🚀 ~ createPlan ~ error:", error);
    res.status(500).json({
      errors: ["No se pudo hacer la operación"]
    });
  }
};

// const updateMovimiento = async (req, res = response) => {
//   try {
//     const { id } = req.params;
//     const { cantidad, tipoMovimiento, usuario, implemento } = req.body;
//     const actualizarFechaMovimiento = dayjs()
//     console.log("🚀 ~ updateMovimiento ~ actualizarFechaMovimiento:", actualizarFechaMovimiento)
//     console.log("🚀 ~ updateMovimiento ~ convertToDateTimeInternational:", convertToDateTimeInternational(actualizarFechaMovimiento))
//     // const planActualizado = await Plan.findByIdAndUpdate(
//     //   id,
//     //   { cantidad, tipoMovimiento, usuario, implemento },
//     //   { new: true }
//     // );
//     res.status(200).json({ cantidad, tipoMovimiento, usuario, implemento });
//   } catch (error) {
//     console.log("🚀 ~ updatePlan ~ error:", error);
//     res.status(500).json({
//       errors: ["No se pudo actualizar el implemento en la base de datos"]
//     });
//   }
// };

// const deletePlan = async (req, res = response) => {
//   try {
//     const { id } = req.params;
//     const planEliminado = await Plan.findByIdAndDelete(id)
//     res.status(200).json(planEliminado);
//   } catch (error) {
//     console.log("🚀 ~ updatePlan ~ error:", error);
//     res.status(500).json({
//       errors: ["No se pudo eliminar el plan en la base de datos"],
//     });
//   }
// };

export { getAllMovimientos, createMovimiento, getMovimiento }