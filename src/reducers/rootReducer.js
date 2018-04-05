import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import categories from './categoriesReducer';
import { recipes } from './recipesReducer';

export default combineReducers({
  user: userReducer,
  toastr: toastrReducer,
  categories,
  recipes
});
