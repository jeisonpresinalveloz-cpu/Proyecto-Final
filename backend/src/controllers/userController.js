const User = require('../models/User');

const getDoctors = async (req, res) => {
    try {
        // Capturar la especialidad si viene en la URL (ej. ?specialty=Cardiología)
        const { specialty } = req.query; 
        
        // Empezamos buscando solo a los usuarios con rol 'medico'
        let query = { role: 'medico' };

        // Si el paciente seleccionó una especialidad, la agregamos al filtro
        if (specialty) {
            query.specialty = specialty;
        }

        // Buscar en MongoDB y usar .select('-password') para NUNCA enviar las contraseñas al frontend
        const doctors = await User.find(query).select('-password');
        
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el catálogo de médicos', error: error.message });
    }
};

module.exports = { getDoctors };