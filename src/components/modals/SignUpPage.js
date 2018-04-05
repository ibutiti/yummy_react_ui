import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon, Card } from 'semantic-ui-react';

import SignUpForm from '../forms/SignUpForm';
import { signUp } from '../../actions/auth';

class SignUpPage extends Component {
  state = {
    modalOpen: false
  };

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  submit = data => this.props.signUp(data).then(() => this.modalClick());

  render() {
    return (
      <div>
        <Modal
          closeIcon
          basic
          open={this.state.modalOpen}
          size="small"
          style={{ marginTop: '80px', marginLeft: '350px' }}
          trigger={
            <span onClick={this.modalClick}>
              <Icon
                name="add circle"
                size="big"
                className="category-modal-icon"
              />
              Sign-Up
            </span>
          }>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>Create a Yummy Recipes Account</Card.Header>
                  <SignUpForm submit={this.submit} cancel={this.modalClick} />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
SignUpPage.propTypes = {
  signUp: PropTypes.func.isRequired
};
export default connect(null, { signUp })(SignUpPage);
