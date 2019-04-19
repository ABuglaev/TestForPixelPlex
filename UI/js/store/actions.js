const gotArticles = articles => (
  {
    type: 'SET_NEW_STATE_ARTICLES',
    payload: articles,
  }
);

export default gotArticles;
