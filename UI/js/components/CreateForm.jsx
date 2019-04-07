import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.createArticle = this.createArticle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  componentDidMount() {

  }

  onSubmit(e) {
    e.preventDefault();
    console.log('Create clicked');
    this.createArticle('http://localhost:8080/articles');
    this.props.history.push('/articles');
  }

  onCancelClick(e) {
    e.preventDefault();
    console.log('Cancel clicked');
    this.props.history.push('/articles');
  }

  createArticle(url) {
    let formData = new FormData();
    formData.append('title', document.getElementById('titleInput').value);
    formData.append('body', document.getElementById('bodyInput').value);

    axios({
      method: 'post',
      url,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((response, err) => {
        if (err) console.log(err);
      });
  }

  render() {
    return (
      <Form id="createForm" onSubmit={this.onSubmit}>
        <h1>Articles / create</h1>
        <Form.Group>
          <h2>Title:</h2>
          <input type="text" id="titleInput" required="required" />
        </Form.Group>
        <Form.Group>
          <h2>Body:</h2>
          <textarea id="bodyInput" placeholder="Article's body..." required="required" />
        </Form.Group>
        <Form.Group>
          <Button variant="secondary" type="submit">Create</Button>
          <Button variant="secondary" onClick={this.onCancelClick}>Cancel</Button>
        </Form.Group>
      </Form>
    );
  }
}

export default withRouter(CreateForm);
