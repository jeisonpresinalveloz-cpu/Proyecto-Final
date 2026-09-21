const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    daysAvailable: [{
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        required: true
    }],
    startTime: {
        type: String, // Ejemplo: "08:00"
        required: true
    },
    endTime: {
        type: String, // Ejemplo: "12:00"
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);