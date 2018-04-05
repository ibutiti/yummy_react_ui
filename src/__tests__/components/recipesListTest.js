import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import RecipesList from '../../components/RecipesList';

Enzyme.configure({ adapter: new Adapter() });

describe('<RecipesList>', () => {
  const store = configureMockStore([thunk])({
    categories: {},
    recipes: { links: {}, data: {} },
    user: { apikey: 'abcd' }
  });
  const props = {
    handleDelete: jest.fn(),
    searchQuery: '',
    listTitle: '',
    handlePaginationChange: jest.fn(() => Promise.resolve('categories')),
    activePage: '1',
    fetchRecipes: jest.fn(() => Promise.resolve('categories')),
    onSearchChange: jest.fn(),
    clearSearch: jest.fn(),
    onSearchSubmit: jest.fn(),
    handleDelete: jest.fn(),
    renderRecipes: jest.fn()
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <RecipesList {...props} />
      </Provider>
    );
  });
});
