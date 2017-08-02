import { Meteor } from 'meteor/meteor';
import React from 'react';
import { TableRowColumn} from 'material-ui/Table';

export default class ClientsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  
  render() {
    return (
        <TableRowColumn>{this.props._id}</TableRowColumn>
        <TableRowColumn>{this.props.name}</TableRowColumn>
        <TableRowColumn>{this.props.name}</TableRowColumn>
    );
  }
};
