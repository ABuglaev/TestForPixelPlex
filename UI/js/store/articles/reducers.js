const initialState = [];

const articlesReducer = (state = initialState, action) => {
  if (action.type === 'SET_NEW_STATE_ARTICLES') {
    return action.payload;
  }

  if (action.type === 'ADD_ARTICLE') {
    return [
      ...state,
      action.payload,
    ];
  }

  return state;
};

export default articlesReducer;
