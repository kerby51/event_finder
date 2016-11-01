const request = require('superagent');
const APP_KEY = require('dotenv');
require('dotenv').config();

class EventKeywords {
  constructor() {

  }
  getEventsByKeywords(keyword) {
    this.apiURL = `http://api.eventful.com/json/events/search?c=music&page_size=25&keywords=${keyword}&app_key=${process.env.APP_KEY}`;
    // console.log(this.apiURL);
    return request.get(this.apiURL)
                       .then((eventResponse) => {
                         return eventResponse.req.res.text;
                       });
  }
}

module.exports = EventKeywords;
