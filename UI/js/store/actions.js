const gotArticles = articles => (
  {
    type: 'SET_NEW_STATE_ARTICLES',
    payload: articles,
  }
);

const gotCount = count => (
  {
    type: 'SET_NEW_STATE_COUNT',
    payload: count,
  }
);

export { gotArticles, gotCount };
