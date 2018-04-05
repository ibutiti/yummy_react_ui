import { toastr } from 'react-redux-toastr';

import {
  CATEGORY_CREATED,
  CATEGORY_EDITED,
  CATEGORIES_FETCHED,
  CATEGORY_DELETED
} from '../types';
import api from '../api';

const categoryCreated = response => ({
  type: CATEGORY_CREATED,
  data: response
});

export const createCategory = (data, apiKey) => dispatch =>
  api.categories.createCategory(data, apiKey).then(response => {
    dispatch(categoryCreated(response));
    toastr.success(response.message);
  });

const categoryEdited = response => ({
  type: CATEGORY_EDITED,
  data: response
});

export const editCategory = (data, id, apiKey) => dispatch =>
  api.categories.editCategory(data, id, apiKey).then(response => {
    dispatch(categoryEdited(response));
    toastr.success(response.message);
  });

const categoriesFetched = response => ({
  type: CATEGORIES_FETCHED,
  data: response
});

export const fetchCategories = (page, limit, apiKey) => dispatch =>
  api.categories.fetchCategories(page, limit, apiKey).then(response => {
    console.log(response);
    dispatch(categoriesFetched(response));
  });

const categoryDeleted = id => ({
  type: CATEGORY_DELETED,
  id
});

export const deleteCategory = (id, apiKey) => dispatch =>
  api.categories.deleteCategory(id, apiKey).then(response => {
    dispatch(categoryDeleted(id));
    toastr.success(response.message);
  });
