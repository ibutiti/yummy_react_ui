import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import HomePage from '../../components/pages/HomePage';

Enzyme.configure({ adapter: new Adapter() });

describe('<HomePage>', () => {
  const store = configureMockStore([thunk])({
    user: { apikey: 'abcd' }
  });
  const props = {
    logout: jest.fn(),
    isAuthenticated: true
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <HomePage {...props} />
      </Provider>
    );
  });
});
