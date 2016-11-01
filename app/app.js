const express = require('express');
const bodyParser = require('body-parser');
const EventKeywords = require('./Eventful/EventKeywords');
const EventLocation = require('./Eventful/EventLocation');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

app.get('/api/events/:keywords', (request, response) => {
  const eventBot = new EventKeywords();
  eventBot.getEventsByKeywords(request.params.keywords).then((eventData) => {
    // console.log('eventdata', eventData)
    response.status(200).send(eventData);
  });
});

app.get('/api/events/searchby/:location', (request, response) => {
  const eventBotLocation = new EventLocation();
  eventBotLocation.getEventsByLocation(request.params.location).then((eventDataLocation) => {
    response.status(200).send(eventDataLocation);
  });
});

module.exports = app;
