const express = require('express');
const { createStudent } = require('../controllers/studentController');
const protectCollege = require('../middleware/authMiddleware'); // Import middleware with correct name and syntax

const router = express.Router();

// Protect this route to allow only logged in colleges
router.post('/create', protectCollege, createStudent);

module.exports = router;
