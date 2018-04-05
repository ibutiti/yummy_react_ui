import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import TopNavigation from '../../components/navigation/TopNavigation';

Enzyme.configure({ adapter: new Adapter() });

describe('<TopNavigation>', () => {
  const store = configureMockStore([thunk])({
    user: { apikey: 'abcd', first_name: 'abc', username: 'abc' }
  });
  const props = {
    login: jest.fn(() => Promise.resolve('user')),
    logout: jest.fn(() => Promise.resolve('user')),
    history: { push: jest.fn() }
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TopNavigation {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders fully', () => {
    const tree = renderer
      .create(
        mount(
          <Provider store={store}>
            <MemoryRouter>
              <TopNavigation {...props} />
            </MemoryRouter>
          </Provider>
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
