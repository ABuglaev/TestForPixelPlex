import { combineReducers } from 'redux';

import { articles, count } from './articles/reducers';

export default combineReducers({
  articles,
  count,
});
