import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';

class DeleteApi extends Component {
  constructor() {
    super();
    this.state = {
      errorText: '',
      loading: false,
    };
  }

  render() {
    const { openModal } = this.props;
    return (
      <Modal
        open={openModal}
        basic
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content="Delete Lab" />
        <Modal.Content>
          <p>Do you want to delete this Lab?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            basic
            color="red"
            inverted
            onClick={this.props.onCloseModal}
          >
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

DeleteApi.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

DeleteApi.defaultProps = {
  openModal: false,
  onCloseModal: () => 0,
};

export default DeleteApi;