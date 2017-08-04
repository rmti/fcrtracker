import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {Clients} from '../api/clients';
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

const clientOne = {
  name: "test"
};

 const styles = {
   smallIcon: {
     width: 18,
     height: 18,
   },
   mediumIcon: {
     width: 48,
     height: 48,
   },
   largeIcon: {
     width: 60,
     height: 60,
   },
   small: {
     width: 18,
     height: 18,
     padding: 2,
   },
   medium: {
     width: 96,
     height: 96,
     padding: 24,
   },
   large: {
     width: 120,
     height: 120,
     padding: 30,
   },
 };

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
        this.setState({error: err.reason});
      }
    });
  }

  handleModalClose() {
    this.setState({error: ''});
  }

  componentDidMount() {
    this.clientsTracker = Tracker.autorun(() => {
      Meteor.subscribe('clients');
      const clients = Clients
        .find({})
        .fetch();
      this.setState({clients});
      console.log(clients);

    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount ClientsList');
    this
      .clientsTracker
      .stop();
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
    < div > 
    <TableToolBar/>
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        < TableRow >
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Address</TableHeaderColumn>
          <TableHeaderColumn>City</TableHeaderColumn>
          <TableHeaderColumn>State</TableHeaderColumn>
          <TableHeaderColumn>Zip</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody stripedRows={false} displayRowCheckbox={false}>
        {this.state.clients.map((client) => {
            return (
              <TableRow key={client._id}>
                <TableRowColumn>{client.name}</TableRowColumn>
                <TableRowColumn >{client.address}</TableRowColumn>
                 <TableRowColumn >{client.city}</TableRowColumn>
                 <TableRowColumn >{client.state}</TableRowColumn>
                <TableRowColumn >{client.zip}</TableRowColumn>
                 <TableRowColumn>
                   <IconButton iconStyle={styles.smallIcon} style={styles.small}><ActionEdit /></IconButton>
                   <IconButton iconStyle={styles.smallIcon} style={styles.small}><ActionDelete /></IconButton>
                 </TableRowColumn>
              </TableRow>
            );
          })
}
      </TableBody>
    </Table> 
    </div>
    );
  }
};