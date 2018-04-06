import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'react-moment';
import {
  Pagination,
  Grid,
  Segment,
  Header,
  Item,
  Icon,
  Input,
  Form
} from 'semantic-ui-react';

import EditRecipeModal from './modals/EditRecipeModal';
import NewRecipeModal from './modals/NewRecipeModal';
import { fetchRecipes, deleteRecipe } from '../actions/recipes';
import ConfirmDelete from './modals/ConfirmDelete';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      searchQuery: '',
      listTitle: 'Your Recipes',
      recipes: this.props.recipes
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      'state at will receive props',
      nextProps,
      this.state,
      this.setState
    );
    this.setState({ recipes: nextProps.recipes });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.fetchRecipes(activePage, 6, this.props.apiKey);
  };

  onSearchSubmit = e => {
    e.preventDefault();
    this.props.fetchRecipes(1, 100, this.props.apiKey, this.state.searchQuery);
    this.setState({
      listTitle: `Search results for ${this.state.searchQuery}`
    });
  };

  onSearchChange = e => {
    this.setState({ ...this.state, searchQuery: e.target.value });
  };

  clearSearch = e => {
    this.setState({
      listTitle: 'Your Recipes',
      searchQuery: ''
    });
    this.props.fetchRecipes(1, 6, this.props.apiKey);
  };

  handleDelete(id) {
    this.props.deleteRecipe(id, this.props.apiKey);
  }

  renderRecipes(recipes) {
    return _.map(recipes, recipe => (
      <Item key={recipe.id}>
        <Item.Content>
          <Item.Header as="h4">{recipe.title}</Item.Header>
          <Item.Meta>
            Created <Moment fromNow>{recipe.created_on}</Moment>
          </Item.Meta>
          <Item.Description className="recipe-description">
            {recipe.content}
          </Item.Description>
          <Item.Extra>
            <span className="recipe-icons">
              <EditRecipeModal
                id={recipe.id}
                title={recipe.title}
                category_id={recipe.category_id}
                content={recipe.content}
              />

              <ConfirmDelete
                content={`Are you sure you want to delete recipe ${
                  recipe.title
                }?`}
                delete={() => this.handleDelete(recipe.id)}
              />
            </span>
          </Item.Extra>
        </Item.Content>
      </Item>
    ));
  }

  render() {
    const { data, links } = this.state.recipes;
    return (
      <Grid.Column width={12}>
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Header as="h3">{this.state.listTitle}</Header>
            </Segment>
            <Segment>
              <NewRecipeModal />
            </Segment>
            <Segment>
              <Form onSubmit={this.onSearchSubmit}>
                <Input
                  value={this.state.searchQuery}
                  name="searchQuery"
                  icon={
                    this.state.listTitle === 'Your Recipes' ? (
                      <Icon
                        name="search"
                        inverted
                        circular
                        link
                        onClick={this.onSearchSubmit}
                      />
                    ) : (
                      <Icon
                        name="delete"
                        inverted
                        circular
                        link
                        onClick={this.clearSearch}
                      />
                    )
                  }
                  onChange={this.onSearchChange}
                  type="text"
                  id="searchQuery"
                  placeholder="Search recipes..."
                />
              </Form>
            </Segment>
          </Segment.Group>
          <Segment>
            <Item.Group color="violet" divided>
              {this.renderRecipes(data)}
            </Item.Group>
            <Pagination
              activePage={this.state.activePage}
              totalPages={_.isEmpty(this.state.recipes) ? links.total_pages : 1}
              onPageChange={this.handlePaginationChange}
              siblingRange={1}
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
            />
          </Segment>
        </Segment.Group>
      </Grid.Column>
    );
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.objectOf(
    PropTypes.shape({
      links: PropTypes.arrayOf(
        PropTypes.shape({
          first: PropTypes.string.isRequired,
          last: PropTypes.string.isRequired,
          next: PropTypes.string.isRequired,
          prev: PropTypes.string.isRequired,
          total_pages: PropTypes.number.isRequired,
          next_num: PropTypes.number.isRequired
        })
      ).isRequired
    })
  )
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    apiKey: state.user.apikey
  };
}
export default connect(mapStateToProps, { fetchRecipes, deleteRecipe })(
  RecipesList
);
