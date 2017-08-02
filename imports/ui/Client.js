import React from 'react';

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

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */

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

const Client = () => (
  <div>
    <TableToolBar/>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Inactive</TableRowColumn>
          <TableRowColumn><IconButton iconStyle={styles.smallIcon} style={styles.small}><ActionEdit /></IconButton>
                          <IconButton iconStyle={styles.smallIcon} style={styles.small}><ActionDelete /></IconButton></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2</TableRowColumn>
          <TableRowColumn>Randal White</TableRowColumn>
          <TableRowColumn>Active</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3</TableRowColumn>
          <TableRowColumn>Stephanie Sanders</TableRowColumn>
          <TableRowColumn>Active</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4</TableRowColumn>
          <TableRowColumn>Steve Brown</TableRowColumn>
          <TableRowColumn>Inactive</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>5</TableRowColumn>
          <TableRowColumn>Christopher Nolan</TableRowColumn>
          <TableRowColumn>AQctive</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default Client;
