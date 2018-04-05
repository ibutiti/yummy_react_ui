import { recipes } from '../../reducers/recipesReducer';
import {
  RECIPES_FETCHED,
  RECIPE_CREATED,
  RECIPE_EDITED,
  RECIPE_DELETED
} from '../../types';

const state = {
  links: {
    first: 'http://localhost:5000/api/v1/category/recipe/?page=1&limit=6&q=',
    last: 'http://localhost:5000/api/v1/category/recipe/?page=1&limit=6&q=',
    next: 'None',
    next_num: null,
    prev: 'None',
    total_pages: 1
  },
  data: {
    '27': {
      category_id: 50,
      content: 'Put oil in a large saucepan...',
      created_on: '2018-04-03T15:41:31.709752+00:00',
      id: '27',
      title: 'Sea Food Masala'
    },
    '28': {
      category_id: 55,
      content: 'jnkjnkjnknknkjnkjnjnkjnkjnkjnknkjnknjnkjnkjnknkjn',
      created_on: '2018-04-03T15:41:31.709752+00:00',
      id: '28',
      title: 'Kjnknkjnknj'
    },
    '29': {
      category_id: 55,
      content: 'Put oil in a large saucepan...',
      created_on: '2018-04-03T15:41:31.709752+00:00',
      id: '29',
      title: 'Fish Masala'
    }
  }
};
const fetch_action = {
  type: 'recipes-fetched',
  data: {
    data: [
      {
        category_id: 55,
        content: 'jnkjnkjnknknkjnkjnjnkjnkjnkjnknkjnknjnkjnkjnknkjn',
        created_on: '2018-04-03T15:41:31.709752+00:00',
        id: '28',
        title: 'Kjnknkjnknj'
      },
      {
        category_id: 55,
        content: 'Put oil in a large saucepan...',
        created_on: '2018-04-03T15:41:31.709752+00:00',
        id: '29',
        title: 'Fish Masala'
      },
      {
        category_id: 50,
        content: 'Put oil in a large saucepan...',
        created_on: '2018-04-03T15:41:31.709752+00:00',
        id: '27',
        title: 'Sea Food Masala'
      }
    ],
    links: {
      first: 'http://localhost:5000/api/v1/category/recipe/?page=1&limit=6&q=',
      last: 'http://localhost:5000/api/v1/category/recipe/?page=1&limit=6&q=',
      next: 'None',
      next_num: null,
      prev: 'None',
      total_pages: 1
    }
  }
};

describe('recipes reducer ignores non recipe types', () => {
  it('ignore non recipe types', () => {
    expect(recipes({}, { type: 'user-logged-in' })).toEqual({});
  });
});

describe('recipes reducer handles recipe actions', () => {
  it('handles fetch recipes action', () => {
    expect(recipes({}, fetch_action)).toEqual(state);
  });

  it('handles create recipe action', () => {
    const newState = { ...state };
    const new_recipe = {
      category_id: 50,
      content: 'Put oil in a large saucepan...',
      created_on: '2018-04-03T15:41:31.709752+00:00',
      id: 30,
      title: 'Sea Food Masala'
    };
    newState.data[new_recipe.id] = new_recipe;
    expect(
      recipes(state, { type: RECIPE_CREATED, data: { new_recipe } })
    ).toEqual(newState);
  });

  it('handles edit recipe action', () => {
    const editedState = { ...state };
    const edited_recipe = {
      category_id: 50,
      content: 'Put oil in a large saucepan...',
      created_on: '2018-04-03T15:41:31.709752+00:00',
      id: 27,
      title: 'Fish Masala'
    };
    editedState.data[edited_recipe.id] = edited_recipe;
    expect(
      recipes(state, { type: RECIPE_EDITED, data: { edited_recipe } })
    ).toEqual(editedState);
  });

  it('handles delete recipe action', () => {
    const stateAfterDelete = { ...state };
    delete stateAfterDelete.data['27'];
    expect(recipes(state, { type: RECIPE_DELETED, id: 27 })).toEqual(
      stateAfterDelete
    );
  });
});
