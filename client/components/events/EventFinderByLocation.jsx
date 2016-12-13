import React from 'react';
import request from 'superagent';
import Modal from 'react-modal'
import dateFormat from 'dateformat';
import EventView from './EventView.jsx';
import Spotify from '../spotify/Spotify.jsx';


class EventFinderByLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      when: '',
      locationEvents: [],
      locationModalOpen: false,
      invalidData: true,
    };
    this.getEventsByLocation = this.getEventsByLocation.bind(this);
    this.sendLocationEvent = this.sendLocationEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleWhenChange = this.handleWhenChange.bind(this);
    this.openLocationModal = this.openLocationModal.bind(this);
    this.closeLocationModal = this.closeLocationModal.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !nextState.location;
  }

  getEventsByLocation() {
    const searchInput = this.state.location;
    const whenInput = this.state.when;
    const cleanSearchInput = searchInput.replace(' ', '%20');
    const cleanWhenInput = whenInput.replace(' ', '%20');
    // console.log(cleanSearchInput)
    fetch(`/api/location-events/${cleanSearchInput}/${cleanWhenInput}`)
           .then((response) => {
              response.json().then((listOfEvents) => {
                console.log(listOfEvents)
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
                let date_time = dateFormat((new Date(), (event.start_time).substring(0, 11))).substring(0,16);

                let title = event.title;
                let event_url = event.url;
                let venue_address = event.venue_address;
                let venue_name = event.venue_name;
                door.push({
                  city_name,
                  country_name,
                  show_id,
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

  sendLocationEvent( title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id ) {
    let body = [];
    body.push({ title, date_time, venue_name, venue_address, city_name, region, country_name, event_url, user_id })
    request.post('/api/events')
           .send( body )
           .then(() => {
             console.log('hello!')
           });
          {this.props.getCurrentUserEvents(this.state)}
  }

  handleLocationChange (e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      location: target.value,
    });
  }

  handleWhenChange (e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      when: target.value,
    });
    // console.log(this.state);
  }

  handleSubmit (e) {
    console.log(this.state);
    e.preventDefault();
    this.getEventsByLocation();
    this.openLocationModal();
    this.setState({
      location: '',
      when: '',
    });
    document.getElementsByClassName('search-input').value = '';
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
            region={door.region}
            date_time={door.date_time}
            title={door.title}
            event_url={door.event_url}
            venue_address={door.venue_address}
            venue_name={door.venue_name}
            sendLocationEvent={this.sendLocationEvent}
            token={this.props.token}

          />
        );
      });
    return (
      <div>
        <form className="location-search-form" onSubmit={this.handleSubmit}>
          <input className="search-input"
                 type="text"
                 name="location"
                 placeholder="search by location..."
                 value={this.state.location}
                 onChange={this.handleLocationChange}
          />
         <input className="search-input"
                 id="when-input"
                 type="text"
                 name="when"
                 placeholder="& when (ie: 'march', 'this weekend', 'tomorrow')"
                 value={this.state.when}
                 onChange={this.handleWhenChange}
          />
          <input className="search-buttons"
                 type="submit"
                 onClick={this.handleSubmit}
                 value="search"
                 placeholder="Search"
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





