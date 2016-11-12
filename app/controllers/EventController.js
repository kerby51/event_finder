const EventDAO = require('../services/EventDAO.js');

class EventController {

  static getAllOfCurrentUser(req, res) {
    EventDAO.searchBy({ user_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }

  static saveEvent (req, res) {
    // console.log(req)
    // console.log('BODY:', req.body)
    // console.log('BODY title:', req.body.title)
    const body = Object.assign({}, req.body)[0];
    const eventData = {
      title: body.title,
      date_time: body.date_time,
      venue_name: body.venue_name,
      venue_address: body.venue_address,
      city_name: body.city_name,
      region: body.region,
      country_name: body.country_name,
      event_url: body.event_url,
      user_id: req.session.currentUser.id,
    };
    console.log(eventData);
    EventDAO.create(eventData)
            .then((event) => res.status(200).json(event));
  }

  static deleteEvent (req, res) {
    EventDAO.delete(req.params.id)
            .then(() =>
              res.status(200).end());
  }
}

module.exports = EventController;






