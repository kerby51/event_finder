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
          <MyEvents events={this.state.events} />
        </div>
      );
    }
        return(
          <div>
            {userDisplayElement}
            <div id="search-bars">
              <div id="keyword-search-bar">
                <EventFinderByKeywords />
              </div>
              <div>
               <h3> -OR- </h3>
              </div>
              <div id="location-search-bar">
                <EventFinderByLocation />
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

 // <div>
 //              {eventDisplayElement}
 //            </div>


