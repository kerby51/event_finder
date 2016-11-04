import React from 'react';


class EventView extends React.Component {
  constructor() {
    super();
  }

  render() {
    // console.log(this.props.title)
    return (
      <div id="event-view">
        <p>{this.props.title}</p>
        <p>{this.props.date_time}</p>
        <p>{this.props.venue_name}</p>
        <p>{this.props.venue_address}</p>
        <p>{this.props.city_name}</p>
        <p>{this.props.region}</p>
        <p>{this.props.country_name}</p>
        <button><a href={this.props.event_url}>More info</a></button>
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

