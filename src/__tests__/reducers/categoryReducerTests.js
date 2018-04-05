import CategoryReducer from '../../reducers/categoriesReducer';
import {
  CATEGORY_CREATED,
  CATEGORY_EDITED,
  CATEGORIES_FETCHED,
  CATEGORY_DELETED
} from '../../types';

const categoryState = {
  links: {
    first: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
    last: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
    next: 'None',
    next_num: null,
    prev: 'None',
    total_pages: 1
  },
  data: {
    '63': {
      created_on: '2018-04-04, 09:40:39',
      id: '63',
      last_edit_on: null,
      name: 'Beef'
    },
    '64': {
      created_on: '2018-04-04, 09:40:39',
      id: 64,
      last_edit_on: null,
      name: 'Fish'
    }
  }
};

const new_category = {
  created_on: '2018-04-04, 09:40:39',
  id: 65,
  last_edit_on: null,
  name: 'Chicken'
};

describe('Category reducer doesnt change state on', () => {
  it('maintains state on non category action', () => {
    expect(
      CategoryReducer(categoryState, { type: 'non category action type' })
    ).toEqual(categoryState);
  });
});

describe('category reducer edits category', () => {
  it('edits category', () => {
    expect(
      CategoryReducer(categoryState, {
        type: CATEGORY_EDITED,
        data: {
          edited_category: {
            created_on: '2018-04-04, 09:40:39',
            id: '64',
            last_edit_on: null,
            name: 'Pork'
          }
        }
      })
    ).toEqual({
      links: {
        first: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        last: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        next: 'None',
        next_num: null,
        prev: 'None',
        total_pages: 1
      },
      data: {
        '63': {
          created_on: '2018-04-04, 09:40:39',
          id: '63',
          last_edit_on: null,
          name: 'Beef'
        },
        '64': {
          created_on: '2018-04-04, 09:40:39',
          id: '64',
          last_edit_on: null,
          name: 'Pork'
        }
      }
    });
  });
});

describe('Category reducer adds new category to state', () => {
  it('adds new category to state', () => {
    expect(
      CategoryReducer(categoryState, {
        type: CATEGORY_CREATED,
        data: {
          new_category
        }
      })
    ).toEqual({
      links: {
        first: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        last: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        next: 'None',
        next_num: null,
        prev: 'None',
        total_pages: 1
      },
      data: {
        '63': {
          created_on: '2018-04-04, 09:40:39',
          id: '63',
          last_edit_on: null,
          name: 'Beef'
        },
        '64': {
          created_on: '2018-04-04, 09:40:39',
          id: '64',
          last_edit_on: null,
          name: 'Pork'
        },
        '65': new_category
      }
    });
  });
});

describe('Category reducer removes deleted category from state', () => {
  it('removes deleted category from state', () => {
    expect(
      CategoryReducer(categoryState, {
        type: CATEGORY_DELETED,
        id: '64'
      })
    ).toEqual({
      links: {
        first: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        last: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        next: 'None',
        next_num: null,
        prev: 'None',
        total_pages: 1
      },
      data: {
        '63': {
          created_on: '2018-04-04, 09:40:39',
          id: '63',
          last_edit_on: null,
          name: 'Beef'
        },
        '65': new_category
      }
    });
  });
});

describe('Category reducer adds fetched categories to state', () => {
  const action = {
    type: 'category-fetched',
    data: {
      data: [
        {
          created_on: '2018-04-04, 09:40:39',
          id: '63',
          last_edit_on: null,
          name: 'Beef'
        },
        {
          created_on: '2018-04-04, 09:40:39',
          id: 65,
          last_edit_on: null,
          name: 'Chicken'
        }
      ],
      links: {
        first: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        last: 'http://localhost:5000/api/v1/category/?page=1&limit=10',
        next: 'None',
        next_num: null,
        prev: 'None',
        total_pages: 1
      }
    }
  };
  it('adds fetched categories to state', () => {
    expect(CategoryReducer({}, action)).toEqual(categoryState);
  });
});
