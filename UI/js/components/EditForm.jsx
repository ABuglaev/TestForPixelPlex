// Можно было переиспользовать компонент для создания статьи, отказался сознательно
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { gotArticles } from '../store/actions';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateArticle = this.updateArticle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let _id = this.props.match.params.id;
    this.updateArticle(`http://localhost:8080/articles/${_id}`);
    this.props.history.push('/articles');
  }

  onCancelClick(e) {
    e.preventDefault();
    this.props.history.push('/articles');
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

  updateArticle(url) {
    let formData = new FormData();
    formData.append('title', document.getElementById('titleInput').value);
    formData.append('body', document.getElementById('bodyInput').value);

    axios({
      method: 'put',
      url,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((response, err) => {
        this.getArticles('http://localhost:8080/articles?page=1');
      });
  }

  render() {
    return (
      <Form id="editForm" onSubmit={this.onSubmit}>
        <h1>Articles / edit</h1>
        <Form.Group>
          <h2>Title:</h2>
          <input type="text" id="titleInput" required="required" />
        </Form.Group>
        <Form.Group>
          <h2>Body:</h2>
          <textarea id="bodyInput" placeholder="Article's body..." required="required" />
        </Form.Group>
        <Form.Group>
          <Button variant="secondary" type="submit">Update</Button>
          <Button variant="secondary" onClick={this.onCancelClick}>Cancel</Button>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => (
  {}
);

const mapDispatchToProps = {
  gotArticles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EditForm));
