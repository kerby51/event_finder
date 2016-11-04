const request = require('superagent');
const APP_KEY = require('dotenv');
require('dotenv').config();
const db = require('../config/db.js');
const sql = require('../config/sqlProvider.js').events;
const Event = require('../models/Event.js');

class EventDAO {

  static create(data) {
    const { title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id } = data;
    return db.one(sql.create, [title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id]);
  }

  static delete(id) {
    return db.none(sql.delete, [id]);
  }

  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new Event(row));
  }

}

module.exports = EventDAO;




  // static searchByKeyword(keyword) {
  //   const URL = `http://api.eventful.com/json/events/search?c=music&page_size=25&keywords=${keyword}&app_key=${process.env.APP_KEY}`;
  //   return request.get(URL).then((keywordResponse) => {
  //     return keywordResponse.req.res.text;
  //   })
  // }

  // static searchByLocation(location) {
  //   const URL = `http://api.eventful.com/json/events/search?c=music&page_size=25&location=${location}&app_key=${process.env.APP_KEY}`;
  //   return request.get(URL).then((locationResponse) => {
  //     return locationResponse.req.res.text;
  //   })
  // }
