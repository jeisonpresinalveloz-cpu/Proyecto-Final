const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // Guardaremos la fecha en formato YYYY-MM-DD
        required: true
    },
    time: {
        type: String, // Ejemplo: "14:00"
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'confirmada'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);