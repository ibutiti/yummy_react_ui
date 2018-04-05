import axios from 'axios';

const ROOT_URL = 'https://yrecipes-api.herokuapp.com/api/v1';
// const ROOT_URL = 'http://localhost:5000/api/v1';
const LOGIN_URL = '/auth/login';
const SIGN_UP_URL = '/auth/register';
const CATEGORY_URL = '/category/';
const RECIPE_URL = '/category/recipe/';
const CHANGE_PASSWORD_URL = '/auth/change-password';

export default {
  user: {
    login: credentials =>
      axios
        .post(`${ROOT_URL}${LOGIN_URL}`, credentials)
        .then(response => response.data),
    signUp: data =>
      axios
        .post(`${ROOT_URL}${SIGN_UP_URL}`, data)
        .then(response => response.data),
    changePassword: data =>
      axios
        .post(`${ROOT_URL}${CHANGE_PASSWORD_URL}`, data)
        .then(response => response.data)
  },
  categories: {
    createCategory: (data, apiKey) =>
      axios({
        method: 'post',
        data,
        url: `${ROOT_URL}${CATEGORY_URL}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    deleteCategory: (id, apiKey) =>
      axios({
        method: 'delete',
        url: `${ROOT_URL}${CATEGORY_URL}${id}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    editCategory: (data, id, apiKey) =>
      axios({
        method: 'put',
        data,
        url: `${ROOT_URL}${CATEGORY_URL}${id}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    fetchCategories: (page, limit, apiKey) =>
      axios({
        method: 'get',
        url: `${ROOT_URL}${CATEGORY_URL}?limit=${limit}&page=${page}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data)
  },
  recipes: {
    fetchRecipes: (page, limit, apiKey, searchQuery = '') =>
      axios({
        method: 'get',
        url: `${ROOT_URL}${RECIPE_URL}?limit=${limit}&page=${page}&q=${searchQuery}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    createRecipe: (data, apiKey) =>
      axios({
        method: 'post',
        data,
        url: `${ROOT_URL}${RECIPE_URL}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    editRecipe: (data, id, apiKey) =>
      axios({
        method: 'put',
        data,
        url: `${ROOT_URL}${RECIPE_URL}${id}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data),
    deleteRecipe: (id, apiKey) =>
      axios({
        method: 'delete',
        url: `${ROOT_URL}${RECIPE_URL}${id}`,
        headers: { 'X-API-KEY': apiKey }
      }).then(response => response.data)
  }
};
