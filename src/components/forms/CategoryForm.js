import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InlineError from '../messages/InlineError';

class CategoryForm extends Component {
  state = {
    data: {
      name: this.props.name ? this.props.name : ''
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
      this.props.submit(this.state.data).catch(err => {
        const error = err.response.data;
        if (error.message) {
          this.setState({
            errors: { global: error.message },
            loading: false
          });
        } else {
          this.setState({
            errors: { global: error.errors.name[0] },
            loading: false
          });
        }
      });
    }
  };

  validate = data => {
    const errors = {};
    // validate the inputs from values
    if (!data.name) errors.name = 'Enter a recipe category name';
    return errors;
  };

  cancel = e => {
    e.preventDefault();
    this.props.cancel();
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.name}>
            <label htmlFor="name">Recipe Category Name</label>
            <input
              value={data.name}
              name="name"
              onChange={this.onChange}
              type="text"
              id="name"
              placeholder="Enter the recipe category name"
            />
            {errors.name && <InlineError text={errors.name} />}
          </Form.Field>
          <Button primary>Submit</Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default CategoryForm;
