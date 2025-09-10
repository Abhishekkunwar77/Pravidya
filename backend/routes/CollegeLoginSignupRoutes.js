const express = require('express');
const {
  registerCollege,
  loginCollege,
} = require('../controllers/CollegeLoginSignupController.js');

const router = express.Router();

router.post('/register', registerCollege);
router.post('/login', loginCollege);

module.exports = router;
