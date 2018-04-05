import { toastr } from 'react-redux-toastr';

import {
  RECIPES_FETCHED,
  RECIPE_DELETED,
  RECIPE_EDITED,
  RECIPE_CREATED
} from '../types';
import api from '../api';

const recipeCreated = response => ({
  type: RECIPE_CREATED,
  data: response
});

export const createRecipe = (data, apiKey) => dispatch =>
  api.recipes.createRecipe(data, apiKey).then(response => {
    dispatch(recipeCreated(response));
    toastr.success(response.message);
  });

const recipeEdited = response => ({
  type: RECIPE_EDITED,
  data: response
});

export const editRecipe = (data, id, apiKey) => dispatch =>
  api.recipes.editRecipe(data, id, apiKey).then(response => {
    dispatch(recipeEdited(response));
    toastr.success(response.message);
  });

const recipesFetched = response => ({
  type: RECIPES_FETCHED,
  data: response
});

export const fetchRecipes = (page, limit, apiKey, searchQuery) => dispatch =>
  api.recipes.fetchRecipes(page, limit, apiKey, searchQuery).then(response => {
    dispatch(recipesFetched(response));
  });

const recipeDeleted = id => ({
  type: RECIPE_DELETED,
  id
});

export const deleteRecipe = (id, apiKey) => dispatch =>
  api.recipes.deleteRecipe(id, apiKey).then(response => {
    dispatch(recipeDeleted(id));
    toastr.success(response.message);
  });
