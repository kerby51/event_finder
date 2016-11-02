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
      keywordEvents: [],
      keywordModalOpen: false,
      invalidData: true,
    };
    this.getEvents = this.getEvents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openKeywordModal = this.openKeywordModal.bind(this);
    this.closeKeywordModal = this.closeKeywordModal.bind(this);
  }

   componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !nextState.keyword;
  }

  getEvents() {
    const searchInput = this.state.keyword;
    const cleanSearchInput = searchInput.replace(' ', '%20');
    fetch(`/api/keyword-events/${cleanSearchInput}`)
           .then((response) => {
              response.json().then((listOfEvents) => {
              let cleanData = listOfEvents.events.event;
              let door = [];
              for(let i = 0; i < cleanData.length; i++) {
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
                keywordEvents: door,
              });
             });
    });
  }


  handleChange (e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      keyword: target.value,
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getEvents();
    this.openKeywordModal();
    this.setState({
      keyword: ''
    });
  }

  openKeywordModal() {
    this.setState({ keywordModalOpen: true });
  }

  closeKeywordModal() {
    this.setState({ keywordModalOpen: false });
  }

  render () {
      const value = this.state.keywordEvents.map((door, idx) => {
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
        <form className="keyword-search-form" onSubmit={this.handleSubmit}>
          <input className="search-input"
                 type="text"
                 name="keyword"
                 placeholder="search by artist or band"
                 value={this.state.keyword}
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
          isOpen={this.state.keywordModalOpen}
          onAfterOpen={this.afterOpenKeywordModal}
          onRequestClose={this.closeKeywordModal}
        >
          <div className="spotify-search">
            <button onClick={this.closeKeywordModal}>X</button>
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

export default EventFinderByKeywords;




  // handleChange (e) {
  //   e.preventDefault();
  //   const target = e.target.value;
  //   const newTarget = target.split(' ').join('%20');
  //   console.log(newTarget);
  //   this.setState({
  //     keyword: newTarget,
  //   });
  // }

  // getEvents() {
  //   const eventList = [];
  //   fetch(`/api/keyword-events/${this.state.keyword}`)
  //          .then((response) => {
  //             response.json().then((listOfEvents) => {
  //             let cleanData = listOfEvents.events.event;
  //             let door = [];
  //             for(let i = 0; i < cleanData.length; i++) {
  //               // console.log(cleanData[i])
  //               let event = cleanData[i];
  //               let city_name = event.city_name;
  //               let country_name = event.country_name;
  //               let show_id = event.id;
  //               // let show_image = event.image.medium.url;
  //               // let performerName = event.performers.performer.name;
  //               // let genre = event.performers.performer.short_bio;
  //               let region = event.region_name;
  //               let date_time = dateFormat((new Date(), (event.start_time).substring(0, 11))).substring(0,11);
  //               let title = event.title;
  //               let event_url = event.url;
  //               let venue_address = event.venue_address;
  //               let venue_name = event.venue_name;
  //               // door.push(event);
  //               door.push({
  //                 city_name,
  //                 country_name,
  //                 show_id,
  //                 // show_image,
  //                 // performerName,
  //                 // genre,
  //                 region,
  //                 date_time,
  //                 title,
  //                 event_url,
  //                 venue_address,
  //                 venue_name,
  //               });
  //             }
  //             this.setState({
  //               keywordEvents: door,
  //             });
  //            });
  //   });
  // }








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


