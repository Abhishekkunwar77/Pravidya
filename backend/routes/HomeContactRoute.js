const express = require('express');
const {
  addContactEnquiry,
  getAllEnquiries,
  deleteEnquiry,
  deleteMultipleEnquiries,
} = require('../controllers/HomeContactController.js');

const router = express.Router();

router.post('/', addContactEnquiry);
router.get('/', getAllEnquiries);
router.delete('/:id', deleteEnquiry);
router.delete('/', deleteMultipleEnquiries);

module.exports = router;
