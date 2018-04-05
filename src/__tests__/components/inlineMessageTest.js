import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import InlineError from '../../components/messages/InlineError';

Enzyme.configure({ adapter: new Adapter() });

describe('<InlineError>', () => {
  const store = configureMockStore([thunk])({
    user: { apikey: 'abcd' }
  });
  const props = {
    text: ''
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <InlineError {...props} />
      </Provider>
    );
  });
});
