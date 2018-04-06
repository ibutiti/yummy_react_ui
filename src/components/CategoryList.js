import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Pagination, Grid, Table } from 'semantic-ui-react';

import EditCategoryPage from './modals/EditCategoryPage';
import NewCategoryPage from './modals/NewCategoryPage';
import { fetchCategories, deleteCategory } from '../actions/categories';
import ConfirmDelete from './modals/ConfirmDelete';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      categories: this.props.categories
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    activePage: 1
  };

  componentWillReceiveProps(props) {
    this.setState({ categories: props.categories });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.fetchCategories(activePage, 10, this.props.apiKey);
  };

  handleDelete(id) {
    this.props.deleteCategory(id, this.props.apiKey);
  }

  renderCategories(categories) {
    return _.map(categories, category => (
      <Table.Row key={category.id}>
        <Table.Cell>{category.name}</Table.Cell>
        <Table.Cell>
          <EditCategoryPage id={category.id} name={category.name} />
        </Table.Cell>

        <Table.Cell>
          <ConfirmDelete
            content={`Are you sure you want to delete recipe category ${
              category.name
            } and all its recipes?`}
            delete={() => this.handleDelete(category.id)}
          />
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { data, links } = this.state.categories;
    return (
      <Grid.Column width={4}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <h3>Your Recipe Categories</h3> <NewCategoryPage />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderCategories(data)}</Table.Body>
          <Table.Footer />
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                {console.log(this.state)}
                <Pagination
                  floated="right"
                  activePage={this.state.activePage}
                  totalPages={!_.isEmpty(links) ? links.total_pages : 1}
                  onPageChange={this.handlePaginationChange}
                  siblingRange={1}
                  boundaryRange={0}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Grid.Column>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.objectOf(
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
    categories: state.categories,
    apiKey: state.user.apikey
  };
}
export default connect(mapStateToProps, { fetchCategories, deleteCategory })(
  CategoryList
);
