import { response } from "express";
import dayjs from "dayjs";
import Assistance from "../models/assistance";
import { convertToDateTimeLocal, convertToDateTimeInternational } from "../helpers/transformDates";


const getAssistance= async(req, res = response) => {
    try {
        const { startDate = '', endDate = '', student='', checker='', environment='' } = req.query;
        const startDateUTC = convertToDateTimeInternational(startDate)
        const endDateUTC = convertToDateTimeInternational(endDate)
        const todayLastHour = dayjs().endOf('day').format()

        const query = { createdAt: { $gte: '1970-01-01', $lte: todayLastHour } }
        if(startDateUTC) query.createdAt = { ...query.createdAt, $gte: startDateUTC }
        if(endDateUTC) query.createdAt = { ...query.createdAt, $lte: dayjs(endDateUTC).endOf('day').format() }
        if(student) query.student = student
        if(checker) query.checker = checker
        if(environment) query.environment = environment
        
        const assistancesUsers = await Assistance.find(query)
                                        .populate('student', 'nroDoc tipoDoc nombreCom')
                                        .populate('environment', 'name')
                                        .populate('checker', 'nroDoc tipoDoc nombreCom')
        res.status(200).json(assistancesUsers)
    } catch (error) {
        console.log("🚀 ~ getAssistanceByStudent ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo obtener las asistencias del estudiante']
        })
    }
}

const createAssistance = async (req, res = response) => {
    try {
        const { environment, student, checker } = req.body
        const assistance = new Assistance({ environment, student, checker})
        await assistance.save()

        const asistanceCreate = 
        await Assistance.findById(assistance._id)
                        .populate('environment', 'name')
                        .populate('student', 'nroDoc tipoDoc nombreCom')
                        .populate('checker', 'nroDoc tipoDoc nombreCom')

        const { createdAt, ...newAssistance } = asistanceCreate._doc
        newAssistance.createdAt = convertToDateTimeLocal(createdAt)
        res.status(201).json(newAssistance)
    } catch (error) {
        console.log("🚀 ~ createAssistance ~ error:", error)
        res.status(500).json({
            errors: ['No se pudo guardar la asistencia en la base de datos']
        })
    }
}

export {
    createAssistance,
    getAssistance
}
