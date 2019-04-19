const initialArticlesState = [];
const articles = (state = initialArticlesState, action) => {
  if (action.type === 'SET_NEW_STATE_ARTICLES') {
    return action.payload;
  }
  return state;
};

const initialCountState = 0;
const count = (state = initialCountState, action) => {
  if (action.type === 'SET_NEW_STATE_COUNT') {
    return action.payload;
  }
  return state;
};

export { articles, count };
