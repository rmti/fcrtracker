import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Clients } from '../api/clients';
import ClientsListItem from './ClientsListItems';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import TableToolBar from './TableToolBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/image/edit';

const clientOne = {name: "test"};

export default class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      error: ''
    };
  }

  handleInsert() {
    Meteor.call('clients.insert', clientOne, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
}

  handleModalClose() {
    this.setState({
      error: ''
    });
  }

  componentDidMount() {
    console.log('componentDidMount ClientsList');
    this.handleInsert();
    this.clientsTracker = Tracker.autorun(() => {
      Meteor.subscribe('clients');
      const clients = Clients.find({}).fetch();
      this.setState({ clients });
      console.log(clients);

    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount ClientsList');
    this.clientsTracker.stop();
  }
  renderLinksListItems() {
    console.log("length:", this.state.clients.length)
    if (this.state.clients.length === 0) {
      return (
        <div className="client">
          <p className="client__status-message">No Clients Found</p>
        </div>
      );
    }
    return this.state.clients.map((client) => {
           return <ClientsListItem key={client._id} {...client}/>;
    });
  }
  render() {
    return (
      <div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderLinksListItems()}
          </TableBody>
        </Table>
      </div>
    );
  }
};
