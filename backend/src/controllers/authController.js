const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importación necesaria para el Token

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, specialty } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ mensaje: 'El usuario ya existe con ese correo' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            specialty
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// Nueva función de Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar si el correo existe en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // 2. Comparar la contraseña ingresada con la encriptada en Mongo
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // 3. Generar el Token de acceso
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Enviar los datos del usuario junto con el token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

// Exportar ambas funciones
module.exports = { registerUser, loginUser };