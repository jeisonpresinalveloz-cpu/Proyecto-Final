const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Al colocar "protect" antes del controlador, blindamos la ruta por completo
router.post('/', protect, createAppointment);

router.get('/my-appointments', protect, getMyAppointments);

module.exports = router;