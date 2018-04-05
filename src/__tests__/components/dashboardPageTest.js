import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import DashboardPage from '../../components/pages/DashboardPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<DashboardPage>', () => {
  const store = configureMockStore([thunk])({
    categories: { links: {}, data: {} },
    recipes: { links: {}, data: {} },
    user: { apikey: 'abcd', first_name: 'acg', username: 'abc' }
  });
  const props = {
    fetchRecipes: jest.fn(() => Promise.resolve('categories')),
    fetchCategories: jest.fn(() => Promise.resolve('categories'))
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <DashboardPage {...props} />
      </Provider>
    );
  });
});
