import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Articles from './Articles.jsx';
import CreateForm from './CreateForm.jsx';
import EditForm from './EditForm.jsx';

const history = createBrowserHistory();

function Home() {
  return (
    <div id="home">
      <h2>Welcome!</h2>
      <Link to="/articles">Go to articles</Link>
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Articles} />
        <Route path="/articles/create" component={CreateForm} />
        <Route path="/articles/:id/edit" component={EditForm} />
      </Router>
    );
  }
}
