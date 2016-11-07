import React from 'react';


const propTypes = {
  events: React.PropTypes.array,
};

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  // handleDelete() {
  //   this.props.deleteEvent(this.props.id);
  //   console.log('yessss!')
  // }

  render() {
    const eventElements = this.props.events.map((event, idx) => {
      return (
        <div id="one-event" key={idx}>
            <p id="event-list-title">{event.title}</p>
            <p>{event.date_time}</p>
            <p>{event.venue_name}</p>
            <p>{event.city_name}, {event.region}</p>
            <button className="more-info-list"><a className="more-info-link" href={event.event_url}>More info</a></button>

        </div>
      );
    });
    return (
      <div id="my-events">
        <h1 id="my-events-header">My Events</h1>
        <ul id="event-list">
          {eventElements.reverse()}
        </ul>
      </div>
    );
  }
}

MyEvents.propTypes = propTypes;

export default MyEvents;


// <button className="delete-button" onClick={this.props.deleteEvent(this.props.id)}>X</button>
// <button className="delete-button" onClick={this.handleDelete}>X</button>
