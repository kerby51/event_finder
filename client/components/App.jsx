import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import UserForm from './users/UserForm.jsx';
import Login from './users/Login.jsx';
import EventFinderByKeywords from './events/EventFinderByKeywords.jsx';
import EventFinderByLocation from './events/EventFinderByLocation.jsx';
import EventView from './events/EventView.jsx';
import MyEvents from './events/MyEvents.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getCurrentUserEvents = this.getCurrentUserEvents.bind(this);
    // this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    this.updateAuth();
    if (cookie.load('token')) {
      this.getCurrentUserEvents();
    }
  }

  getCurrentUserEvents() {
    request.get('/api/events')
           .then((response) => {
             const events = response.body;
             this.setState({ events });
           })
           .catch(() => {
             this.updateAuth();
           });
  }

  // deleteEvent(id) {
  //   request.del(`/api/events/${id}`)
  //          .then(() => {
  //            this.getCurrentUserEvents();
  //          })
  //          console.log('oh hi')
  // }

  signOut() {
    request.post('/api/signout')
           .then(() => this.updateAuth());
  }
  updateAuth() {
    this.setState({
      token: cookie.load('token'),
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then(() => {
           this.updateAuth();
           this.getCurrentUserEvents();
         });
  }
  signUp(userDetails) {
    request.post('/api/signup')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
            this.getCurrentUserEvents();
          });
  }

  render () {
    let userDisplayElement;
    let eventDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
          <button onClick={this.signOut}>Log-Out!</button>
          <div id="blank-div"></div>
        </div>
      );
    } else {
      userDisplayElement = (
        <div>
          <nav>
            <Login signUp={this.signUp} logIn={this.logIn} />
          </nav>
        </div>
      );
    }
    if (this.state.token) {
      eventDisplayElement = (
        <div>
          <MyEvents events={this.state.events} deleteEvent={this.deleteEvent} />
        </div>
      );
    }
        return(
          <div>
            {userDisplayElement}
            <header>
              <h1 id="title">Live<span>4</span>Live</h1>
              <h2 id="sub-title">Discover music events happening near you</h2>
              <p id="directions">Sign-in to start tracking your events, or simply start searching, either by location and timeframe OR by artist!</p>
            </header>

            <div id="search-bars">
               <div id="location-search-bar">
                <EventFinderByLocation token={this.state.token} getCurrentUserEvents={this.getCurrentUserEvents} />
              </div>
              <div>
               <h3 id="or"> -OR- </h3>
              </div>
               <div id="keyword-search-bar">
                <EventFinderByKeywords token={this.state.token} getCurrentUserEvents={this.getCurrentUserEvents} />
              </div>
            </div>
            <div>
              {eventDisplayElement}
            </div>
          </div>
        )
  }
}

export default App;


// <Link id="myEvents" to="/events">My Events</Link>

  // {this.state.myEventsView ?
  //             <MyEvents
  //                     myEvents = {this.state.myEventsView}
  //                     events = {this.state.events}
  //             /> : <Home />}
