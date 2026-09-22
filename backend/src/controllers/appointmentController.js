const Appointment = require('../models/Appointment');
const User = require('../models/User');

const createAppointment = async (req, res) => {
    try {
        const { doctorId, date, startTime, reason } = req.body;

        const patientId = req.user.id; 

        // 1. Validar que el médico exista
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'medico') {
            return res.status(404).json({ mensaje: 'Médico no encontrado o rol inválido' });
        }

        // 2. Regla Anti-Colisión: ¿El médico ya tiene una cita activa en ese día y hora?
        const conflict = await Appointment.findOne({ 
            doctor: doctorId, 
            date, 
            startTime, 
            status: { $ne: 'Cancelada' } // Ignoramos las citas canceladas
        });

        if (conflict) {
            return res.status(400).json({ mensaje: 'El horario seleccionado ya no está disponible' });
        }

        // 3. Crear la reserva
        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            date,
            startTime,
            reason
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar la reserva', error: error.message });
    }
};

// Función para que el paciente vea su historial de citas
const getMyAppointments = async (req, res) => {
    try {
        // Buscar todas las citas donde el paciente sea el usuario autenticado (extraído del token)
        // Usamos .populate() para traer los datos del doctor (nombre y especialidad) en lugar de solo su ID
        const appointments = await Appointment.find({ patient: req.user.id })
            .populate('doctor', 'name specialty');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el historial de citas', error: error.message });
    }
};

module.exports = { createAppointment, getMyAppointments };