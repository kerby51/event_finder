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


