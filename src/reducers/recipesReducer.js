import _ from 'lodash';
import {
  RECIPES_FETCHED,
  RECIPE_CREATED,
  RECIPE_EDITED,
  RECIPE_DELETED
} from '../types';

export function recipes(state = {}, action = {}) {
  switch (action.type) {
    case RECIPES_FETCHED:
      const list = {};
      list.links = action.data.links;
      list.data = _.mapKeys(action.data.data, 'id');
      return list;
    case RECIPE_CREATED:
      console.log('action', action, state);
      const newState = { ...state };
      newState.data[action.data.new_recipe.id] = action.data.new_recipe;
      console.log('new state', state);
      return newState;
    case RECIPE_EDITED:
      const editedState = { ...state };
      editedState.data[action.data.edited_recipe.id] =
        action.data.edited_recipe;
      return editedState;
    case RECIPE_DELETED:
      const stateAfterDelete = { ...state };
      delete stateAfterDelete.data[action.id];
      return stateAfterDelete;
    default:
      return state;
  }
}
