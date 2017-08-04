import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Settings from 'material-ui/svg-icons/action/settings';
import Delete from 'material-ui/svg-icons/action/delete';
import Description from 'material-ui/svg-icons/action/description';
import Payment from 'material-ui/svg-icons/action/payment';
import Receipt from 'material-ui/svg-icons/action/receipt';
import Schedule from 'material-ui/svg-icons/action/schedule';
import People from 'material-ui/svg-icons/social/people';
import Person from 'material-ui/svg-icons/social/person';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import {Accounts} from 'meteor/accounts-base';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class FCRAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="header">
        <AppBar title="fcrTracker" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} showMenuIconButton={true} iconElementRight={< FlatButton label = "Logout" onTouchTap = {
          () => Accounts.logout()
        } />}/>

        <Drawer open={this.state.open}>
          <AppBar title="Menu" showMenuIconButton={true} iconElementLeft={<IconButton > <ArrowBack/> </IconButton>} onLeftIconButtonTouchTap={this.handleToggle.bind(this)}/>
          <Menu>
            <MenuItem value="Invoice" primaryText="Invoices" leftIcon={< Description />} onTouchTap={this.handleToggle.bind(this)} containerElement={< Link to = "/invoice" />}/>
            <MenuItem value="PaymentMenu" primaryText="Payments" leftIcon={< Payment />}/>
            <MenuItem value="ExpenseMenu" primaryText="Expenses" leftIcon={< Receipt />}/>
            <MenuItem value="ClientMenu" primaryText="Clients" leftIcon={< People />} onTouchTap={this.handleToggle.bind(this)} containerElement={< Link to = "/client" />}/>
            <MenuItem value="VendorMenu" primaryText="Vendors" leftIcon={< Person />}/>
            <MenuItem value="TimeAccountingMenu" primaryText="Time Accounting" leftIcon={< Schedule />}/>
            <MenuItem value="Profile" primaryText="Profile" leftIcon={< Description />} containerElement={< Link to = "/profile" />}/>
            <MenuItem value="SettingsMenu" primaryText="Settings" leftIcon={< Settings />}/>
          </Menu>
        </Drawer>
      </div>
    )
  }
};
