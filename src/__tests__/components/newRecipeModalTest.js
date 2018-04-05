import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDom from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import NewRecipeModal from '../../components/modals/NewRecipeModal';

Enzyme.configure({ adapter: new Adapter() });

describe('<NewRecipeModal>', () => {
  const store = configureMockStore([thunk])({
    recipes: { links: {}, data: {} },
    categories: { links: {}, data: {} },
    user: { apikey: 'abcd' }
  });
  const props = {
    modalClick: jest.fn(),
    createRecipe: jest.fn(() => Promise.resolve('recipes')),
    fetchCategories: jest.fn(() => Promise.resolve('categories')),
    submit: jest.fn(),
    setState: jest.fn(),
    modalOpen: false
  };

  // test it renders without crashing
  it('should render without crashing', () => {
    const { enzymeWrapper } = mount(
      <Provider store={store}>
        <NewRecipeModal {...props} />
      </Provider>
    );
  });

  it('renders fully', () => {
    const tree = renderer
      .create(
        mount(
          <Provider store={store}>
            <NewRecipeModal {...props} />
          </Provider>
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
