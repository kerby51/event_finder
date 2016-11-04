const express = require('express');
const EventController = require('../controllers/EventController.js');

const router = express.Router();

// router.get('/:keywords', EventController.searchEventsByKeyword);
// router.get('/location-search', EventController.searchEventsByLocation);
router.get('/', EventController.getAllOfCurrentUser);
router.post('/', EventController.saveEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;
