import React from 'react';
// import DonationForm from './DonationForm.jsx';

const propTypes = {
  events: React.PropTypes.array,
};

class MyEvents extends React.Component {
  render() {
    const eventElements = this.props.events.map((event, idx) => {
      return (
        <div id="one-event" key={idx}>
            <p>{event.title}</p>
            <p>{event.date_time}</p>
            <p>{event.venue_name}</p>
            <p>{event.city_name}</p>
            <p>{event.region}</p>
            <a href={event.event_url}>More info</a>
        </div>
      );
    });
    return (
      <div id="my-events">
        <h3>my events</h3>
        <ul id="event-list">
          {eventElements.reverse()}
        </ul>
      </div>
    );
  }
}

MyEvents.propTypes = propTypes;

export default MyEvents;
