import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';

import CreateForm from './CreateForm.jsx';
import EditForm from './EditForm.jsx';

let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <li className="page-item" key={number}>
      <Link role="button" to={`?page=${number}`} className="page-link" num={number}>
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
      articles: [{ _id: '', title: 'There no articles yet', body: '' }],
      show: false,
      created_at: null,
      updated_at: null,
      title: null,
      body: null,
    };
  }

  componentDidMount() {
    this.getArticles('http://localhost:8080/articles?page=1');
    document.getElementById('articlesPagination').firstChild.classList.add('active');
  }

  onPageClick(e) {
    e.preventDefault();
    let p = e.target.getAttribute('num');
    this.props.history.push(`/articles?page=${p}`);
    e.target.parentNode.parentNode.childNodes.forEach(v => v.classList.remove('active'));
    e.target.parentNode.classList.add('active');
    this.getArticles(`http://localhost:8080/articles?page=${p}`);
  }

  onViewClick(e) {
    e.preventDefault();
    let a = e.target.parentNode.parentNode.id;
    console.log(a);
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
        if (!response.data.articles) return this.setState({ articles: [{ _id: '', title: 'There no articles yet', body: '' }] });
        return this.setState({ articles: response.data.articles });
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
        console.log('Created: ', cd);
        console.log('Updated: ', ud);
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
    const articleTrs = this.state.articles.map(v => (
      <tr id={v._id} key={v._id}>
        <td>{v._id}</td>
        <td>{v.title}</td>
        <td>{v.body}</td>
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
          <Modal.Body>{this.state.body}</Modal.Body>
          <Modal.Footer>
            <span>Created: <i>{this.state.created_at}</i></span>
            <span>Updated: <i>{this.state.updated_at}</i></span>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default Articles;
