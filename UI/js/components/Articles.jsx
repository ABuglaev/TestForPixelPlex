import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';

import gotArticles from '../store/actions';

let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <li className="page-item" key={`page${number}`}>
      <Link to={`?page=${number}`} className="page-link" num={number}>
        {number}
      </Link>
    </li>,
  );
}

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.onPageClick = this.onPageClick.bind(this);
    this.getAnArticle = this.getAnArticle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    console.log('Articles props: ', this.props);
    let params = new URLSearchParams(location.search);
    let p = params.get('page') || 1;
    let l = params.get('limit');

    this.getArticles(`http://localhost:8080/articles?page=${p}&limit=${l}`);
    document.querySelector(`#articlesPagination li:nth-child(${p})`).classList.add('active');

    window.onpopstate = () => {
      console.log('location changed');
      let params = new URLSearchParams(location.search);
      let p = params.get('page') || 1;
      let l = params.get('limit');

      document.querySelectorAll('.page-item').forEach(v => v.classList.remove('active'));
      document.querySelector(`#articlesPagination li:nth-child(${p})`).classList.add('active');

      if (p && l) {
        this.getArticles(`http://localhost:8080/articles?page=${p}&limit=${l}`);
      } else
      if (p) {
        this.getArticles(`http://localhost:8080/articles?page=${p}`);
      }
    };
  }

  onPageClick(e) {
    e.preventDefault();
    let p = e.target.getAttribute('num');
    e.target.parentNode.parentNode.childNodes.forEach(v => v.classList.remove('active'));
    e.target.parentNode.classList.add('active');
    this.getArticles(`http://localhost:8080/articles?page=${p}`);
  }

  onViewClick(e) {
    e.preventDefault();
    let a = e.target.parentNode.parentNode.id;
    this.getAnArticle(`http://localhost:8080/articles/${a}`);
  }

  getArticles(url) {
    axios({
      method: 'get',
      url,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.data) return console.log('There no  articles!');
        return this.props.gotArticles(response.data.articles);
      });
  }

  getAnArticle(url) {
    axios({
      method: 'get',
      url,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.data) return console.log('This article doesn\'t exist!');
        let cd = (new Date(response.data.created_at)).toISOString();
        let ud = (new Date(response.data.updated_at)).toISOString();
        return this.setState({
          show: true,
          created_at: cd,
          updated_at: ud,
          title: response.data.title,
          body: response.data.body,
        });
      });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    console.log('Articles propps before render: ', this.props);
    let articleTrs = this.props.articles.map(v => (
      <tr id={v._id} key={v._id}>
        <td>{v._id}</td>
        <td>{(v.title.length < 15) ? v.title : `${v.title.substring(0, 11)}...`}</td>
        <td>{(v.body.length < 15) ? v.body : `${v.body.substring(0, 11)}...`}</td>
        <td>
          <Link to={`/articles/${v._id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button variant="secondary" onClick={e => this.onViewClick(e)}>View</Button>
        </td>
      </tr>
    ));

    return (
      <div id="articles">
        <div id="articlesHeader">
          <span>Articles</span>
          <Link to="/articles/create">
            <Button variant="secondary">Create</Button>
          </Link>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Body</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {articleTrs}
          </tbody>
        </Table>

        <Pagination className="justify-content-center" id="articlesPagination" onClick={this.onPageClick}>
          {items}
        </Pagination>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body><pre>{this.state.body}</pre></Modal.Body>
          <Modal.Footer>
            <span>Created: <i>{this.state.created_at}</i></span>
            <span>Updated: <i>{this.state.updated_at}</i></span>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    articles: state.articles,
  }
);

const mapDispatchToProps = {
  gotArticles,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Articles));
