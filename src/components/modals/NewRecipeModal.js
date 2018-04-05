import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon, Card } from 'semantic-ui-react';

import RecipeForm from '../forms/RecipeForm';
import { createRecipe } from '../../actions/recipes';
import { fetchCategories } from '../../actions/categories';

class NewRecipeModal extends Component {
  state = {
    modalOpen: false
  };

  componentDidMount() {
    this.props.fetchCategories(1, 1000, this.props.apiKey);
  }

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  submit = data =>
    this.props.createRecipe(data, this.props.apiKey).then(() => {
      this.setState({ modalOpen: false });
    });

  render() {
    return (
      <div>
        <Modal
          basic
          size="small"
          open={this.state.modalOpen}
          style={{ marginTop: '180px', marginLeft: '350px' }}
          trigger={
            <span onClick={this.modalClick}>
              <Icon name="add circle" className="category-modal-icon" />
              Add a Recipe
            </span>
          }>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>
                    {_.isEmpty(this.props.categories) ? (
                      <span onClick={this.modalClick}>
                        Create a Recipe Category First
                      </span>
                    ) : (
                      'Add a Recipe'
                    )}
                  </Card.Header>
                  {_.isEmpty(this.props.categories) ? (
                    ''
                  ) : (
                    <RecipeForm
                      categories={this.props.categories}
                      submit={this.submit}
                      cancel={this.modalClick}
                    />
                  )}
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
NewRecipeModal.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    apiKey: state.user.apikey,
    categories: state.categories.data
  };
}

export default connect(mapStateToProps, { createRecipe, fetchCategories })(
  NewRecipeModal
);
