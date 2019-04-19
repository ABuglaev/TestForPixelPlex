import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
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

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    console.log('App props: ', this.props);
    return (
      <Router history={history}>

        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Articles} p={1} />
        <Route path="/articles/create" component={CreateForm} />
        <Route path="/articles/:id/edit" component={EditForm} />
      </Router>
    );
  }
}

const mapStateToProps = state => (
  {
    articles: state.articles,
  }
);

const mapDispatchToProps = dispatch => (
  {

  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
