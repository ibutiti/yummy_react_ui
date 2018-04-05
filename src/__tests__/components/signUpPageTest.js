import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import SignUpPage from '../../components/modals/SignUpPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<SignUpPage>', () => {
  const store = configureMockStore([thunk])({
    categories: {},
    user: { apikey: 'abcd' }
  });
  const props = {
    signUp: jest.fn(() => Promise.resolve('user')),
    history: { push: jest.fn() }
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <SignUpPage {...props} />
      </Provider>
    );
  });
});
