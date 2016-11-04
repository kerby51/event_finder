class Event {
  constructor({ id, title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id }) {
    this.id = id;
    this.title = title;
    this.date_time = date_time;
    this.venue_name = venue_name;
    this.venue_address = venue_address;
    this.city_name = city_name;
    this.region = region;
    this.country_name = country_name;
    this.event_url = event_url;
    this.user_id = user_id;
  }
}

module.exports = Event;



