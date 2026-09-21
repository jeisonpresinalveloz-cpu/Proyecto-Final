const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Al colocar "protect" antes del controlador, blindamos la ruta por completo
router.post('/', protect, createAppointment);

module.exports = router;