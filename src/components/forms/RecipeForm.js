import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InlineError from '../messages/InlineError';

class RecipeForm extends Component {
  state = {
    data: {
      title: this.props.title ? this.props.title : '',
      content: this.props.content ? this.props.content : '',
      category_id: this.props.category_id
        ? String(this.props.category_id)
        : '55'
    },
    loading: false,
    errors: {}
  };

  // method to capture and store form input
  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSelect = (e, { value }) => {
    this.setState({
      data: { ...this.state.data, category_id: value }
    });
  };

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
          const globalErrors = [];
          error.errors.title && globalErrors.push(error.errors.title[0]);
          error.errors.category_id &&
            globalErrors.push(error.errors.category_id[0]);
          error.errors.content && globalErrors.push(error.errors.content[0]);

          this.setState({
            errors: { global: globalErrors },
            loading: false
          });
        }
      });
    }
  };

  validate = data => {
    const errors = {};
    const nameRegex = /^[a-zA-Z]+(([' .-][a-zA-Z ])?[a-zA-Z]*)*$/i;
    // validate the inputs from values
    if (!data.title) {
      errors.title = 'Enter a recipe title';
    } else if (!data.title.match(nameRegex)) {
      errors.title = 'Only letters, numbers, hyphens and underscores allowed';
    }
    return errors;
  };

  cancel = e => {
    e.preventDefault();
    this.props.cancel();
  };

  render() {
    const options = () => {
      const selectOptions = [];

      _.mapValues(this.props.categories, category => {
        selectOptions.push({
          key: category.id,
          text: category.name,
          value: category.id
        });
      });
      return selectOptions;
    };
    const selectOptions = options();
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
          <Form.Field error={!!errors.title}>
            <label htmlFor="title">Recipe Title</label>
            <input
              value={data.title}
              name="title"
              onChange={this.onChange}
              type="text"
              id="title"
              placeholder="Enter the recipe title"
            />
            {errors.title && <InlineError text={errors.title} />}
          </Form.Field>
          <Form.Field error={!!errors.category_id}>
            <label htmlFor="category_id">Recipe Category</label>
            <Form.Select
              value={data.category_id}
              name="category_id"
              onChange={this.onSelect}
              options={selectOptions}
              id="category_id"
              placeholder="Enter the recipe category name"
            />
            {errors.category_id && <InlineError text={errors.category_id} />}
          </Form.Field>
          <Form.Field error={!!errors.content}>
            <label htmlFor="content">Recipe Content</label>
            <Form.TextArea
              value={data.content}
              name="content"
              onChange={this.onChange}
              id="content"
              placeholder="Enter the recipe content"
            />
            {errors.content && <InlineError text={errors.content} />}
          </Form.Field>
          <Button primary>Submit</Button>
          <Button onClick={this.cancel}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

RecipeForm.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default RecipeForm;
