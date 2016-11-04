import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
// import MyEvents from './components/events/MyEvents.jsx';

ReactDOM.render(<App />, document.querySelector('#root'));


// ReactDOM.render((
//   <Router history={hashHistory} >
//     <Route path="/" component={App} >
//       <Route path="events" component={MyEvents} />
//     </Route>
//   </Router>
//   ), document.querySelector('#root'));

console.log('working');



