import React from 'react';
import request from 'superagent';
import EventFinderByKeywords from './EventFinderByKeywords.jsx';
import EventFinderByLocation from './EventFinderByLocation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleChange (e) {
  //   e.preventDefault();
  //   const target = e.target.value;
  //   const newTarget = target.split(' ').join('%20');
  //   console.log(newTarget);
  //   this.setState({
  //     keyword: newTarget,
  //   });
  //   this.getEvents();
  // }

  // handleSubmit (e) {
  //   e.preventDefault();
  //   this.getEvents();
  // }

  render () {
        return(
          <div id="search-bars">
            <div id="keyword-search-bar">
            <EventFinderByKeywords />
            </div>
            <div id="location-search-bar">
            <EventFinderByLocation />
            </div>
          </div>
        )
  }
}

export default App;
