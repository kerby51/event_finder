const request = require('superagent');
const APP_KEY = require('dotenv');
require('dotenv').config();

class EventLocation {
  constructor() {

  }
  getEventsByLocation(location, when) {
    this.apiURL = `http://api.eventful.com/json/events/search?c=music&page_size=45&when=${when}&location=${location}&app_key=${process.env.APP_KEY}`;
    // console.log(this.apiURL);
    return request.get(this.apiURL)
                       .then((eventResponseLocation) => {
                         return eventResponseLocation.req.res.text;
                       });
  }
}

module.exports = EventLocation;
