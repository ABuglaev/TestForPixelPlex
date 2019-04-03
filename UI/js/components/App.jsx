import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import Articles from './Articles.js';
// // import SignupForm from './SignupForm.jsx';
// // import Table from './Table.jsx';
// // import PasswordResetForm from './PasswordResetForm.jsx';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    //console.log('453'.match(/\D/g));
  }

  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/articles" component={Articles} />
      </div>
    </Router>
    )
  }
}

function Home() {
  return (
    <div>
      <h2>Welcome</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
