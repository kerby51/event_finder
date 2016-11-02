const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const authentication = require('./middleware/authentication');
const session = require('express-session')
const EventKeywords = require('./Eventful/EventKeywords');
const EventLocation = require('./Eventful/EventLocation');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.get('/api/keyword-events/:keywords', (request, response) => {
  const eventBot = new EventKeywords();
  eventBot.getEventsByKeywords(request.params.keywords).then((eventData) => {
    // console.log('eventdata', eventData)
    response.status(200).send(eventData);
  });
});

app.get('/api/location-events/:location', (request, response) => {
  const eventBotLocation = new EventLocation();
  eventBotLocation.getEventsByLocation(request.params.location).then((eventDataLocation) => {
    response.status(200).send(eventDataLocation);
  });
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));


app.use('/api', authentication);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
// app.use('/api/events', eventRouter);

module.exports = app;






