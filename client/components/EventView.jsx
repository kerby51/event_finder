import React from 'react';



class EventView extends React.Component {
  constructor() {
    super();
  }

  // parseDateAndTime() {
  //   date = {this.props.dateAndTime};
  //   sub = date.substring(0, 11);
  //   remainder = date.substring(11);
  //   console.log(remainder);
  // }

  render() {
    return (
      <div id="event-view">
      <p>{this.props.title}</p>
      <p>{this.props.performerName}</p>
      <p>{this.props.dateAndTime}</p>
      <p>{this.props.venueName}</p>
      <p>{this.props.venueAddress}</p>
      <p>{this.props.cityName}</p>
      <p>{this.props.region}</p>
      <p>{this.props.countryName}</p>

      <p>{this.props.showImage}</p>
      <p>{this.props.genre}</p>
      <button><a href={this.props.eventURL}>More info</a></button>
      </div>
    )
  }
}

export default EventView;


// <p>{this.props.showId}</p>


// String s ="123456789abcdefgh";
// String sub = s.substring(0, 10);
// String remainder = s.substring(10);
