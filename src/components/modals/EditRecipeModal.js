import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeForm from '../forms/RecipeForm';
import { Modal, Icon, Card } from 'semantic-ui-react';
import { editRecipe } from '../../actions/recipes';
import { fetchCategories } from '../../actions/categories';

class EditRecipeModal extends Component {
  componentDidMount() {
    this.props.fetchCategories(1, 1000, this.props.apiKey);
  }
  state = {
    modalOpen: false
  };

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  submit = data =>
    this.props.editRecipe(data, this.props.id, this.props.apiKey).then(() => {
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
          trigger={<Icon onClick={this.modalClick} name="edit" size="small" />}>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>Edit your Recipe</Card.Header>
                  <RecipeForm
                    title={this.props.title}
                    category_id={this.props.category_id}
                    content={this.props.content}
                    categories={this.props.categories}
                    submit={this.submit}
                    cancel={this.modalClick}
                  />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
EditRecipeModal.propTypes = {
  editRecipe: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    apiKey: state.user.apikey,
    categories: state.categories.data
  };
}

export default connect(mapStateToProps, { editRecipe, fetchCategories })(
  EditRecipeModal
);
