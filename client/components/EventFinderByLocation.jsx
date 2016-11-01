import React from 'react';
import request from 'superagent';
import Modal from 'react-modal'
import dateFormat from 'dateformat';
import EventView from './EventView.jsx';
import Spotify from './Spotify.jsx';


class EventFinderByLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      locationEvents: [],
      locationModalOpen: false,
    };
    this.getEventsByLocation = this.getEventsByLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openLocationModal = this.openLocationModal.bind(this);
    this.closeLocationModal = this.closeLocationModal.bind(this);
    // this.afterOpenKeywordModal = this.afterOpenKeywordModal.bind(this);
  }
  getEventsByLocation() {
    fetch(`/api/events/searchby/${this.state.location}`)
           .then((response) => {
              response.json().then((listOfEvents) => {
              let cleanData = listOfEvents.events.event;
              let door = [];
              for(let i = 0; i < cleanData.length; i++) {
                // console.log(cleanData[i])
                let event = cleanData[i];
                let cityName = event.city_name;
                let countryName = event.country_name;
                let showId = event.id;
                // let showImage = event.image_url;
                // let performerName = event.performers.performer.name;
                // let genre = event.performers.performer.short_bio;
                let region = event.region_name;
                let dateAndTime = dateFormat((new Date(), (event.start_time).substring(0, 11))).substring(0,11);
                console.log(dateAndTime);
                let title = event.title;
                let eventURL = event.url;
                let venueAddress = event.venue_address;
                let venueName = event.venue_name;
                // door.push(event);
                door.push({
                  cityName,
                  countryName,
                  showId,
                  // showImage,
                  // performerName,
                  // genre,
                  region,
                  dateAndTime,
                  title,
                  eventURL,
                  venueAddress,
                  venueName,
                });
              }
              this.setState({
                locationEvents: door,
              });
             });
    });
  }

  handleChange (e) {
    e.preventDefault();
    const target = e.target.value;
    const newTarget = target.split(' ').join('%20');
    console.log(newTarget);
    this.setState({
      location: newTarget,
    });
    // this.getEventsByLocation();
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getEventsByLocation();
    this.openLocationModal();
  }

  openLocationModal() {
    this.setState({ locationModalOpen: true });
  }

  closeLocationModal() {
    this.setState({ locationModalOpen: false });
  }

  render () {
      const value = this.state.locationEvents.map((door, idx) => {
        return(
          <EventView key={idx}
            cityName={door.cityName}
            countryName={door.countryName}
            showId={door.showId}
            // showImage={door.showImage}
            // performerName={door.performerName}
            // genre={door.genre}
            region={door.region}
            dateAndTime={door.dateAndTime}
            title={door.title}
            eventURL={door.eventURL}
            venueAddress={door.venueAddress}
            venueName={door.venueName}
          />
        );
      });
    return (
      <div>
        <form className="location-search-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 name="location"
                 placeholder="search by location"
                 defaultValue={this.state.location}
                 onBlur={this.handleChange}
          />
          <button className="search-buttons"
                 type="submit"
                 onClick={this.handleSubmit}
                 value="search"
          />
        </form>
        <Modal
          className="keyword-search-modal"
          isOpen={this.state.locationModalOpen}
          onAfterOpen={this.afterOpenLocationModal}
          onRequestClose={this.closeLocationModal}
        >
          <button onClick={this.closeLocationModal}>X</button>
          <Spotify />
          <div id="location-search">
            {value}
          </div>

        </Modal>
      </div>
    );
  }
}

export default EventFinderByLocation;
