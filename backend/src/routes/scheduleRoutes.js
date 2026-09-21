const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules } = require('../controllers/scheduleController');

// Ruta para crear un horario (POST /api/schedules)
router.post('/', createSchedule);

// Ruta para obtener el catálogo de horarios (GET /api/schedules)
router.get('/', getSchedules);

module.exports = router;