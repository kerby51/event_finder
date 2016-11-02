import React from 'react';



class EventView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="event-view">
      <p>{this.props.title}</p>
      <p>{this.props.performer_name}</p>
      <p>{this.props.date_time}</p>
      <p>{this.props.venue_name}</p>
      <p>{this.props.venue_address}</p>
      <p>{this.props.city_name}</p>
      <p>{this.props.region}</p>
      <p>{this.props.country_name}</p>
      <button><a href={this.props.event_url}>More info</a></button>
      </div>
    )
  }
}

export default EventView;


// <p>{this.props.showId}</p>


// String s ="123456789abcdefgh";
// String sub = s.substring(0, 10);
// String remainder = s.substring(10);
