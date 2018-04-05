import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import AddCategoryCall from '../AddCategoryCall';
import AddRecipeCall from '../AddRecipeCall';
import { fetchCategories } from '../../actions/categories';
import { fetchRecipes } from '../../actions/recipes';
import CategoryList from '../CategoryList';
import RecipesList from '../RecipesList';

class DashboardPage extends Component {
  componentWillMount() {
    this.props.fetchCategories(1, 10, this.props.user.apikey);
    this.props.fetchRecipes(1, 6, this.props.user.apikey);
  }

  render() {
    const { data } = this.props.categories;
    return (
      <Grid>
        {_.isEmpty(data) ? <AddCategoryCall /> : <CategoryList />}

        {_.isEmpty(this.props.recipes.data) ? (
          <AddRecipeCall />
        ) : (
          <RecipesList />
        )}
      </Grid>
    );
  }
}

DashboardPage.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    apikey: PropTypes.string.isRequired
  })
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    recipes: state.recipes,
    user: state.user
  };
}
export default connect(mapStateToProps, { fetchCategories, fetchRecipes })(
  DashboardPage
);
