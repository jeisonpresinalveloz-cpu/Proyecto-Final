const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Verificar si la petición trae el token en los encabezados (Headers)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraer el token separando la palabra "Bearer "
            token = req.headers.authorization.split(' ')[1];

            // Desencriptar el token usando la misma clave secreta de tu .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Guardar los datos del usuario (id y rol) en la petición para usarlos luego
            req.user = decoded; 
            
            next(); // Permitir que la petición continúe hacia el controlador
        } catch (error) {
            return res.status(401).json({ mensaje: 'No autorizado, token inválido o expirado' });
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: 'No autorizado, no hay token provisto' });
    }
};

module.exports = { protect };