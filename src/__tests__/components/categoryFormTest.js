import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import CategoryForm from '../../components/forms/CategoryForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<CategoryForm>', () => {
  const store = configureMockStore([thunk])({
    categories: {}
  });
  const props = {
    submit: jest.fn(() => Promise.resolve('categories')),
    cancel: jest.fn(),
    validate: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn()
  };
  const preventDefault = jest.fn();
  const component = mount(
    <Provider store={store}>
      <CategoryForm {...props} />
    </Provider>
  );
  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <CategoryForm {...props} />
      </Provider>
    );
  });

  it('executes a submit on form', () => {
    expect(component.find('form').length).toBe(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
  });
});
