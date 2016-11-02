import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from './users/UserForm.jsx';
import Login from './users/Login.jsx';
import EventFinderByKeywords from './EventFinderByKeywords.jsx';
import EventFinderByLocation from './EventFinderByLocation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    // this.sendEvent = this.sendEvent.bind(this);
  }

  componentDidMount() {
    this.updateAuth();
    // if (cookie.load('token')) {
    //   console.log('hello');
    // }
  }

  // getCurrentUserEvents() {
  //   request.get('/api/events')
  //          .then((response) => {
  //            const events = response.body;
  //            this.setState({ events });
  //          })
  //          .catch(() => {
  //            this.updateAuth();
  //          });
  // }

  // sendEvent({ title, kajsdf, akjdsf, kjad, kjasdf, kajdsf }) {
  //   request.post('/api/events')
  //          .send({ title, date, name, etc. etc,  })
  //          .then(() => {
  //            this.getCurrentUserEvents();
  //          });
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
           // this.getCurrentUserEvents();
         });
  }
  signUp(userDetails) {
    request.post('/api/signup')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
            // this.getCurrentUserEvents();
          });
  }

  render () {
    let userDisplayElement;
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
          </div>
        )
  }
}

export default App;


