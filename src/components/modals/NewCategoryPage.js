import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryForm from '../forms/CategoryForm';
import { Modal, Icon, Card } from 'semantic-ui-react';
import { createCategory } from '../../actions/categories';

class NewCategoryPage extends Component {
  state = {
    modalOpen: false
  };

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  submit = data =>
    this.props.createCategory(data, this.props.apiKey).then(() => {
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
              Add a Category
            </span>
          }>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>Create a Recipe Category</Card.Header>
                  <CategoryForm submit={this.submit} cancel={this.modalClick} />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
NewCategoryPage.propTypes = {
  createCategory: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    apiKey: state.user.apikey
  };
}

export default connect(mapStateToProps, { createCategory })(NewCategoryPage);
