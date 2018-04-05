import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class SignUpForm extends Component {
  state = {
    data: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    loading: false,
    errors: {}
  };

  // method to capture and store form input
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  cancel = e => {
    e.preventDefault();
    this.props.cancel();
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: {
            global: _.map(err.response.data.errors, value => `${value[0]} `)
          },
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    const nameRegex = /^[a-zA-Z]+(([' .-][a-zA-Z ])?[a-zA-Z]*)*$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i;
    // validate the inputs from values
    if (!isEmail(data.email)) errors.email = 'Invalid email';

    if (!data.first_name) {
      errors.first_name = 'Enter a first name';
    } else if (!data.first_name.match(nameRegex)) {
      errors.first_name =
        'Only letters, numbers, hyphens and underscores allowed';
    }

    if (!data.last_name) {
      errors.last_name = 'Enter a last name';
    } else if (!data.last_name.match(nameRegex)) {
      errors.last_name =
        'Only letters, numbers, hyphens and underscores allowed';
    }

    if (!data.username) {
      errors.username = 'Enter a username';
    } else if (data.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }

    if (!data.password) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!data.password.match(passwordRegex)) {
      errors.password = 'Must contain a letter, number, symbol and no spaces';
    }

    if (!(data.password === data.confirm_password)) {
      errors.confirm_password = 'Passwords do not match';
    }
    return errors;
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
        <Form.Field error={!!errors.first_name}>
          <label htmlFor="first_name">First Name</label>
          <input
            value={data.first_name}
            name="first_name"
            onChange={this.onChange}
            type="text"
            id="first_name"
            placeholder="John"
          />
          {errors.first_name && <InlineError text={errors.first_name} />}
        </Form.Field>
        <Form.Field error={!!errors.last_name}>
          <label htmlFor="last_name">Last Name</label>
          <input
            value={data.last_name}
            name="last_name"
            onChange={this.onChange}
            type="text"
            id="last_name"
            placeholder="Doe"
          />
          {errors.last_name && <InlineError text={errors.last_name} />}
        </Form.Field>
        <Form.Field error={!!errors.username}>
          <label htmlFor="username">Userame</label>
          <input
            value={data.username}
            name="username"
            onChange={this.onChange}
            type="text"
            id="username"
            placeholder="john-doe"
          />
          {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
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
        <Form.Field error={!!errors.confirm_password}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            value={data.confirm_password}
            onChange={this.onChange}
            name="confirm_password"
            type="password"
            id="confirm_password"
            placeholder="Retype password here"
          />
          {errors.confirm_password && (
            <InlineError text={errors.confirm_password} />
          )}
        </Form.Field>
        <Button primary>Sign Up</Button>
        <Button onClick={this.cancel}>Cancel</Button>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignUpForm;
