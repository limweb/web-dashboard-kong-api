import React, { Component } from 'react';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import CommonTable from '../common/CommonTable';

class UserManagment extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          code: 50083,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
        {
          code: 50084,
          name: 'Kevin Julián Martinez Escobar',
          email: 'kevinjulian.martinezescobar@alumnos.upm.es',
          grade: 'Electronica industrial y automatica',
          roles: 'Admin',
          permissions: 'Admin, Peltier, FPGA, Compilador C',
        },
      ],
      openModal: false,
      basic: false,
      edit: false,
    };
    this.userModal = this.userModal.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(code) {
    this.setState({ codeSelected: code });
  }

  userModal() {
    this.setState({ openModal: true });
  }

  deleteModal() {
    this.setState({ openModal: true, basic: true });
  }

  closeModal() {
    this.setState({ openModal: false, basic: false, edit: false });
  }

  render() {
    const { items, openModal, basic } = this.state;
    return (
      <div className="inside-container">
        <Header as="h1">User managment</Header>
        <CommonTable
          items={items}
          keyNames={[
            'code',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
          headersText={[
            'código',
            'name',
            'email',
            'grade',
            'roles',
            'permissions',
          ]}
          addText="Añadir Usuario"
          editText="Editar Usuario"
          deleteText="Eliminar Usuario"
          onAdd={this.userModal}
          onEdit={() => this.userModal(true)}
          onDelete={this.deleteModal}
          onSelected={this.handleSelected}
          keySelected="code"
        />
        <Modal
          open={openModal}
          basic={basic}
          size="small"
          onClose={this.closeModal}
        >
          <Header icon="delete" content="Delete Users" />
          <Modal.Content>
            <p>Your inbox is getting full, would you
            like us to enable automatic archiving of old messages?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default UserManagment;
