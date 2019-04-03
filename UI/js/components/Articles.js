import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

let Articles = () => (
  <div id="articles">
    <div id="articlesHeader">
        <span>Articles</span>
        <Button variant="secondary">Create</Button>
    </div>

    <Table bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Body</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>445345</td>
          <td>title1</td>
          <td>article body1</td>
          <td>
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">View</Button>
          </td>
        </tr>
        <tr>
          <td>2456345</td>
          <td>title2</td>
          <td>article body 2</td>
          <td>
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">View</Button>
          </td>
        </tr>
        <tr>
          <td>3546354</td>
          <td>title3</td>
          <td>article body 333</td>
          <td>
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">View</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default Articles;