const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/userController');

// Ruta para obtener la lista de médicos (GET /api/users/doctors)
router.get('/doctors', getDoctors);

module.exports = router;