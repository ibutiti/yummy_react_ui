import React, { Component } from 'react';
import { Confirm, Icon } from 'semantic-ui-react';

class ConfirmDelete extends Component {
  state = { open: false };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    this.props.delete();
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Icon
          onClick={this.show}
          name="delete"
          size="small"
          style={{ display: 'inline' }}
        />
        <Confirm
          className="modal1-margin"
          open={this.state.open}
          content={this.props.content}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default ConfirmDelete;
