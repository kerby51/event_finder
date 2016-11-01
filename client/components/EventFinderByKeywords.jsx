import React from 'react';
import request from 'superagent';
import Modal from 'react-modal'
import dateFormat from 'dateformat';
import EventView from './EventView.jsx';
import Spotify from './Spotify.jsx';


class EventFinderByKeywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      events: [],
      keywordModalOpen: false,
    };
    this.getEvents = this.getEvents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openKeywordModal = this.openKeywordModal.bind(this);
    this.closeKeywordModal = this.closeKeywordModal.bind(this);
    // this.afterOpenKeywordModal = this.afterOpenKeywordModal.bind(this);
  }
  getEvents() {
    const eventList = [];
    fetch(`/api/events/${this.state.keyword}`)
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
                // let showImage = event.image.medium.url;
                // let performerName = event.performers.performer.name;
                // let genre = event.performers.performer.short_bio;
                let region = event.region_name;
                let dateAndTime = dateFormat((new Date(), (event.start_time).substring(0, 11))).substring(0,11);
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
                events: door,
              });
              // console.log(this.state.event)
             });
    });
  }

  handleChange (e) {
    e.preventDefault();
    const target = e.target.value;
    const newTarget = target.split(' ').join('%20');
    console.log(newTarget);
    this.setState({
      keyword: newTarget,
    });
    // this.getEvents();
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getEvents();
    this.openKeywordModal();
    this.setState({
      keyword: '',
    })
  }

  openKeywordModal() {
    this.setState({ keywordModalOpen: true });
  }

  // afterOpenKeywordModal() {
  //   this.refs.subtitle.style.color = '#f00';
  // }

  closeKeywordModal() {
    this.setState({ keywordModalOpen: false });
  }

  render () {
      const value = this.state.events.map((door, idx) => {
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
        <form className='keyword-search-form' onSubmit={this.handleSubmit}>
          <input type='text'
                 name='keyword'
                 placeholder='search by artist or band'
                 defaultValue={this.state.keyword}
                 onBlur={this.handleChange}
          />
          <button className="search-buttons"
                 type='submit'
                 onClick={this.handleSubmit}
                 value='search'
          />
        </form>
        <Modal
          className="keyword-search-modal"
          isOpen={this.state.keywordModalOpen}
          onAfterOpen={this.afterOpenKeywordModal}
          onRequestClose={this.closeKeywordModal}
        >
          <button onClick={this.closeKeywordModal}>X</button>
          <Spotify />
            <div id="keyword-search">
              {value}
            </div>
        </Modal>
      </div>
    );
  }
}

export default EventFinderByKeywords;





















// render () {
//       const value = this.state.events.map((door) => {
//         return(
//           <EventView
//             cityName={door.cityName}
//             countryName={door.countryName}
//             showId={door.showId}
//             showImage={door.showImage}
//             performerName={door.performerName}
//             genre={door.genre}
//             region={door.region}
//             dateAndTime={door.dateAndTime}
//             title={door.title}
//             eventURL={door.eventURL}
//             venueAddress={door.venueAddress}
//             venueName={door.venueName}
//           />
//         );
//       });

//     return (
//       <div>
//         <form id='search-form' onSubmit={this.handleSubmit}>
//           <input type='text'
//                  name='keyword'
//                  placeholder='keyword'
//                  defaultValue={this.state.keyword}
//                  onBlur={this.handleChange}
//           />
//           <input type='submit'
//                  onClick={this.handleSubmit}
//                  value='search'
//           />
//         </form>
//           {value}
//       </div>
//     );
//   }


