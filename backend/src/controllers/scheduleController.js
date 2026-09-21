const Schedule = require('../models/Schedule');
const User = require('../models/User');

// Función para que el administrador cree un horario
const createSchedule = async (req, res) => {
    try {
        const { doctorId, daysAvailable, startTime, endTime } = req.body;

        // Verificar si el usuario existe y si su rol es 'medico'
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'medico') {
            return res.status(404).json({ mensaje: 'Médico no encontrado o rol inválido' });
        }

        const schedule = await Schedule.create({
            doctor: doctorId,
            daysAvailable,
            startTime,
            endTime
        });

        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el horario', error: error.message });
    }
};

// Función para que los pacientes vean el catálogo de médicos y sus horarios
const getSchedules = async (req, res) => {
    try {
        // .populate() reemplaza el ID del doctor con sus datos reales (nombre y especialidad)
        const schedules = await Schedule.find().populate('doctor', 'name specialty email');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los horarios', error: error.message });
    }
};

module.exports = { createSchedule, getSchedules };