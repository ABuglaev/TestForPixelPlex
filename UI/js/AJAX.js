import axios from 'axios';

let getArticles = (url) => {
  axios({
    method: 'get',
    url,
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => {
      // if (!response.data.articles) { location.hash = '#login'; return; }
      this.setState({ articles: response.data.articles });
    });
};

let getArticle = (comp, token) => {
  axios({
    method: 'post',
    url: 'http://tonight.by:3012/getTableData',
    headers: {
      'content-type': 'application/json',
      Authorization: localStorage.getItem('Token') || 'none',
    },
    data: { token },
  })
    .then((response) => {
      if (response.data.status === 0) { return; }
      comp.setState({ petsRows: response.data });
    });
};

let addArticle = (formData) => {
  axios({
    method: 'post',
    url: 'http://tonight.by:3012/addPet',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
  })
    .catch((error) => {
      console.log(error);
    });
};

let updateArticle = (formData) => {
  console.log('trying to send update pet req...');
  axios({
    method: 'post',
    url: 'http://tonight.by:3012/updatePet',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
  })
    .then((response) => {
      console.log('Ok');
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  getArticles, getArticle, addArticle, updateArticle,
};
