const express = require('express');
const {
  addSubscriber,
  getSubscribers,
  deleteSubscriber,
  deleteMultipleSubscribers,
} = require('../controllers/subscriberController.js');

const router = express.Router();

router.post('/subscribe', addSubscriber);
router.get('/', getSubscribers);
router.delete('/:id', deleteSubscriber);
router.delete('/', deleteMultipleSubscribers);

module.exports = router;
