const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: ['paciente', 'medico', 'admin'],
        default: 'paciente'
    },
    specialty: {
        type: String, // Solo lo usaremos si el rol es 'medico'
        default: null
    }
}, {
    timestamps: true // Esto crea automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('User', userSchema);