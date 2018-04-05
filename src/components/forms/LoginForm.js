import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  // method to capture and store form input
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: { global: err.response.data.message },
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    // validate the inputs from values
    if (!data.password) errors.password = 'Enter a password';
    if (!isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  };

  cancel = e => {
    e.preventDefault();
    this.props.cancel();
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            name="email"
            onChange={this.onChange}
            type="email"
            id="email"
            placeholder="example@example.com"
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={this.onChange}
            name="password"
            type="password"
            id="password"
            placeholder="Make it secure"
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
        <Button onClick={this.cancel}>Cancel</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
