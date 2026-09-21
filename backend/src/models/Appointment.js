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
        type: String, 
        required: true // Formato esperado: "YYYY-MM-DD"
    },
    startTime: { 
        type: String, 
        required: true // Formato esperado: "HH:MM"
    },
    status: { 
        type: String, 
        enum: ['Pendiente', 'Confirmada', 'Cancelada'], 
        default: 'Pendiente' 
    },
    reason: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);