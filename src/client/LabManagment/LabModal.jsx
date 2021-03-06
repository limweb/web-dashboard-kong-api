import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header, Modal, Button, Icon, Form, Input, TextArea, Message } from 'semantic-ui-react';
import _ from 'lodash';

const initialState = {
  error: false,
  loading: false,
  name: '',
  client_id: '',
  client_secret: '',
  redirect_uri: '',
  description: '',
  listError: [],
  listErrorMessages: [],
};

const fields = [
  'name',
  'redirect_uri',
  'description',
];

class LabModal extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { item } = this.props;
    if (nextProps.item.name !== item.name) {
      this.setState({ ...nextProps.item });
    }
  }

  handleClose() {
    this.setState(initialState);
    this.props.onCloseModal();
  }

  handleChange(e, { name, value }) {
    const { listError, listErrorMessages } = this.state;
    const resetError = listError.filter(obj => obj !== name);
    const resetMessages = listErrorMessages.filter(obj => !obj.includes(name));
    const error = (resetMessages.length !== 0);
    this.setState({
      [name]: value,
      listError: resetError,
      listErrorMessages: resetMessages,
      error,
    });
  }

  handleSubmit() {
    const formFields = _.pick(this.state, fields);
    const formKeys = _.keys(formFields);
    const listErrorMessages = [];
    const listError = [];
    formKeys.forEach((obj) => {
      if (formFields[obj] === '') {
        listErrorMessages.push(`Field ${obj} required`);
        listError.push(obj);
      }
    });
    if (listErrorMessages.length !== 0) {
      return this.setState({
        error: true,
        listErrorMessages,
        listError,
      });
    }
    return this.props.onSubmit(formFields);
  }

  render() {
    const {
      loading,
      name,
      client_id,
      client_secret,
      description,
      redirect_uri,
      listError,
      listErrorMessages,
      error,
    } = this.state;
    const { openModal, item, intl } = this.props;
    const selected = !!item.name;
    return (
      <Modal
        open={openModal}
        size="small"
        onClose={this.props.onCloseModal}
      >
        <Header icon="trash outline" content={intl.formatMessage({ id: 'labmanagment.title' })} />
        <Modal.Content>
          <Form error={error} loading={loading}>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-api-name"
                control={Input}
                name="name"
                value={name}
                disabled={selected}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'labmanagment.form.name' })}
                placeholder={intl.formatMessage({ id: 'labmanagment.form.name' })}
                error={listError.includes('name')}
              />
              <Form.Field
                id="form-input-api-redirect_uri"
                control={Input}
                name="redirect_uri"
                value={redirect_uri}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'labmanagment.form.urlredirect' })}
                placeholder={intl.formatMessage({ id: 'labmanagment.form.urlredirect' })}
                error={listError.includes('redirect_uri')}
              />
            </Form.Group>
            <Form.Field
              id="form-input-api-description"
              control={TextArea}
              name="description"
              value={description}
              onChange={this.handleChange}
              label={intl.formatMessage({ id: 'labmanagment.form.description' })}
              placeholder={intl.formatMessage({ id: 'labmanagment.form.description' })}
              error={listError.includes('description')}
            />
            <Form.Group widths="equal">
              <Form.Field
                id="form-textarea-api-client_id"
                control={Input}
                name="client_id"
                value={client_id}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'labmanagment.form.clientid' })}
                placeholder={intl.formatMessage({ id: 'labmanagment.form.clientid' })}
                disabled
              />
              <Form.Field
                id="form-textarea-api-client_secret"
                control={Input}
                name="client_secret"
                value={client_secret}
                onChange={this.handleChange}
                label={intl.formatMessage({ id: 'labmanagment.form.clientsecret' })}
                placeholder={intl.formatMessage({ id: 'labmanagment.form.clientsecret' })}
                disabled
              />
            </Form.Group>
            <Message
              error
              header="Error create api"
              list={listErrorMessages}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            disabled={loading}
            onClick={this.handleSubmit}
          >
            <Icon name="checkmark" /> {intl.formatMessage({ id: 'common.save' })}
          </Button>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={this.handleClose}
          >
            <Icon name="remove" /> {intl.formatMessage({ id: 'common.no' })}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

LabModal.propTypes = {
  intl: intlShape.isRequired,
  item: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

LabModal.defaultProps = {
  item: {},
  openModal: false,
  onCloseModal: () => 0,
  onSubmit: () => 0,
};

export default injectIntl(LabModal);
