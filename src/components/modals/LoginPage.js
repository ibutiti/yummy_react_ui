import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon, Card } from 'semantic-ui-react';

import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component {
  state = {
    modalOpen: false
  };

  submit = data =>
    this.props.login(data).then(() => {
      this.props.history.push('/dashboard');
    });

  modalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    return (
      <div>
        <Modal
          basic
          closeIcon
          open={this.state.modalOpen}
          size="small"
          style={{ marginTop: '180px', marginLeft: '350px' }}
          trigger={
            <span onClick={this.modalClick}>
              <Icon name="user circle" size="big" />
              Login
            </span>
          }>
          <Modal.Content>
            <Modal.Description>
              <Card color="violet" fluid>
                <Card.Content>
                  <Card.Header>Login to Yummy Recipes</Card.Header>
                  <LoginForm submit={this.submit} cancel={this.modalClick} />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};
export default connect(null, { login })(LoginPage);
