import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import SignUpForm from '../../components/forms/SignUpForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<SignUpForm>', () => {
  const store = configureMockStore([thunk])({});
  const props = {
    submit: jest.fn(() => Promise.resolve('signup')),
    cancel: jest.fn(),
    validate: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn()
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <SignUpForm {...props} />
      </Provider>
    );
  });
});