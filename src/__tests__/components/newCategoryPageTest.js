import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import NewCategoryPage from '../../components/modals/NewCategoryPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<NewCategoryPage>', () => {
  const store = configureMockStore([thunk])({
    categories: {},
    user: { apikey: 'abcd' }
  });
  const props = {
    modalClick: jest.fn(),
    createCategory: jest.fn(() => Promise.resolve('categories')),
    submit: jest.fn()
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <NewCategoryPage {...props} />
      </Provider>
    );
  });
});
