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
      invalidData: true,
    };
    this.getEventsByLocation = this.getEventsByLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openLocationModal = this.openLocationModal.bind(this);
    this.closeLocationModal = this.closeLocationModal.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !nextState.location;
  }

  getEventsByLocation() {
    const searchInput = this.state.location;
    const cleanSearchInput = searchInput.replace(' ', '%20');
    fetch(`/api/location-events/${cleanSearchInput}`)
           .then((response) => {
              response.json().then((listOfEvents) => {
              let cleanData = listOfEvents.events.event;
              let door = [];
              for(let i = 0; i < cleanData.length; i++) {
                // console.log(cleanData[i])
                let event = cleanData[i];
                let city_name = event.city_name;
                let country_name = event.country_name;
                let show_id = event.id;
                // let show_image = event.image.medium.url;
                // let performerName = event.performers.performer.name;
                // let genre = event.performers.performer.short_bio;
                let region = event.region_name;
                let date_time = dateFormat((new Date(), (event.start_time).substring(0, 11))).substring(0,11);

                let title = event.title;
                let event_url = event.url;
                let venue_address = event.venue_address;
                let venue_name = event.venue_name;
                // door.push(event);
                door.push({
                  city_name,
                  country_name,
                  show_id,
                  // show_image,
                  // performerName,
                  // genre,
                  region,
                  date_time,
                  title,
                  event_url,
                  venue_address,
                  venue_name,
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
    const target = e.target;
    this.setState({
      location: target.value,
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getEventsByLocation();
    this.openLocationModal();
    this.setState({
      location: ''
    });
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
            city_name={door.city_name}
            country_name={door.country_name}
            show_id={door.show_id}
            // show_image={door.show_image}
            // performerName={door.performerName}
            // genre={door.genre}
            region={door.region}
            date_time={door.date_time}
            title={door.title}
            event_url={door.event_url}
            venue_address={door.venue_address}
            venue_name={door.venue_name}
          />
        );
      });
    return (
      <div>
        <form className="location-search-form" onSubmit={this.handleSubmit}>
          <input className="search-input"
                 type="text"
                 name="location"
                 placeholder="search by location"
                 value={this.state.location}
                 onChange={this.handleChange}
          />
          <input className="search-buttons"
                 type="submit"
                 onClick={this.handleSubmit}
                 value="search"
                 disabled={this.state.invalidData}
          />
        </form>
        <Modal
          className="keyword-search-modal"
          isOpen={this.state.locationModalOpen}
          onAfterOpen={this.afterOpenLocationModal}
          onRequestClose={this.closeLocationModal}
        >
          <div className="spotify-search">
            <button onClick={this.closeLocationModal}>X</button>
            <Spotify />
          </div>
          <ul className="event-list">
            {value}
          </ul>

        </Modal>
      </div>
    );
  }
}

export default EventFinderByLocation;
