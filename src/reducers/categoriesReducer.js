import _ from 'lodash';
import {
  CATEGORY_CREATED,
  CATEGORY_EDITED,
  CATEGORIES_FETCHED,
  CATEGORY_DELETED
} from '../types';

export default function categories(state = {}, action = {}) {
  switch (action.type) {
    case CATEGORY_CREATED:
      const newState = { ...state };
      newState.data[action.data.new_category.id] = action.data.new_category;
      return newState;
    case CATEGORY_EDITED:
      const editedState = { ...state };
      editedState.data[action.data.edited_category.id] =
        action.data.edited_category;
      return editedState;
    case CATEGORIES_FETCHED:
      const list = {};
      list.links = action.data.links;
      list.data = _.mapKeys(action.data.data, 'id');
      return list;
    case CATEGORY_DELETED:
      const stateAfterDelete = { ...state };
      delete stateAfterDelete.data[action.id];
      return stateAfterDelete;
    default:
      return state;
  }
}
