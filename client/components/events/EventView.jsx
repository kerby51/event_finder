import React from 'react';


class EventView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let eventListDisplay;
    if(this.props.token) {
      eventListDisplay = (
        <div className="event-view">
        <p className="event-view-title">{this.props.title}</p>
        <p className="event-view-date">{this.props.date_time}</p>
        <p className="event-view-venue">{this.props.venue_name}</p>
        <p className="event-view-address">{this.props.venue_address}</p>
        <p className="event-view-city">{this.props.city_name}, {this.props.region}</p>
        <p className="event-view-country">{this.props.country_name}</p>
        <button className="more-info"><a className="more-info-link" href={this.props.event_url}>More info</a></button>
        <button id="add-button"
              type="submit"
              onClick={ this.props.keywordModalOpen ?
                () => {
                  this.props.sendEvent(
                  this.props.title,
                  this.props.date_time,
                  this.props.venue_name,
                  this.props.venue_address,
                  this.props.city_name,
                  this.props.region,
                  this.props.country_name,
                  this.props.event_url,
                  this.user_id
                  )
              } :
                () => {
                  this.props.sendLocationEvent(
                  this.props.title,
                  this.props.date_time,
                  this.props.venue_name,
                  this.props.venue_address,
                  this.props.city_name,
                  this.props.region,
                  this.props.country_name,
                  this.props.event_url,
                  this.user_id
                  )
              }}
              >Add Event</button>
      </div>
      );
    } else {
      eventListDisplay = (
        <div className="event-view">
          <p className="event-view-title">{this.props.title}</p>
          <p className="event-view-date">{this.props.date_time}</p>
          <p className="event-view-venue">{this.props.venue_name}</p>
          <p className="event-view-address">{this.props.venue_address}</p>
          <p className="event-view-city">{this.props.city_name}, {this.props.region}</p>
          <p className="event-view-country">{this.props.country_name}</p>
          <button className="more-info"><a className="more-info-link" href={this.props.event_url}>More info</a></button>
      </div>
      );
    }
    return (
      <div>
        {eventListDisplay}
      </div>
    )
  }
}

export default EventView;


// <button id="add-button"
//               onClick={this.props.sendEvent(
//                   this.props.title,
//                   this.props.date_time,
//                   this.props.venue_name,
//                   this.props.venue_address,
//                   this.props.city_name,
//                   this.props.region,
//                   this.props.country_name,
//                   this.props.event_url, this.one)} >Add Event</button>

 // <button id="add-button"
 //              type="submit"
 //              onClick={() => {
 //                  this.props.sendEvent(
 //                    this.props.title,
 //                    this.props.date_time,
 //                    this.props.venue_name,
 //                    this.props.venue_address,
 //                    this.props.city_name,
 //                    this.props.region,
 //                    this.props.country_name,
 //                    this.props.event_url, this.user_id)
 //              }}
 //              >Add Event</button>

