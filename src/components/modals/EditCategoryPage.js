import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon, Card } from 'semantic-ui-react';

import CategoryForm from '../forms/CategoryForm';
import { editCategory } from '../../actions/categories';

class EditCategoryPage extends Component {
  state = {
    modalOpen: false
  };

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  submitEdit = data =>
    this.props
      .editCategory(data, this.props.id, this.props.apiKey)
      .then(() => this.setState({ modalOpen: false }));

  render() {
    return (
      <div>
        <Modal
          open={this.state.modalOpen}
          basic
          size="small"
          style={{ marginTop: '180px', marginLeft: '350px' }}
          trigger={<Icon name="edit" size="small" onClick={this.modalClick} />}>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>Edit Recipe Category</Card.Header>
                  <CategoryForm
                    name={this.props.name}
                    submit={this.submitEdit}
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
EditCategoryPage.propTypes = {
  editCategory: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    apiKey: state.user.apikey
  };
}

export default connect(mapStateToProps, { editCategory })(EditCategoryPage);
