import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import { Clients } from '../api/clients';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class AddClient extends React.Component {
  constructor(props) {
    console.log('constructor AddClient');
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      telephone: '',
      facsimile: '',
      email: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {

    e.preventDefault();

    Meteor.call('clients.insert', this.state, (err, res) => {
      console.log('details are:', this.state)
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      name: '',
      address:'',
      city:'',
      state:'',
      zip:'',
      telephone:'',
      facsimile:'',
      email: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <RaisedButton label="Add Client" primary={false} onTouchTap={() => this.setState({isOpen: true})} />
        <Dialog 		          
          title="Add client"
		      modal={true}
          open={this.state.isOpen}>
          <TextField hintText="Name" floatingLabelText="Name" id="name" defaultValue="" 
            onChange={e => this.setState({ name: e.target.value })}/><br />
          <TextField hintText="Address" floatingLabelText="Address" id="address" defaultValue="" 
            onChange={e => this.setState({ address: e.target.value })}/><br />
          <TextField hintText="City" floatingLabelText="City" id="city" defaultValue="" 
            onChange={e => this.setState({ city: e.target.value })}/><br /> 
          <TextField hintText="State" floatingLabelText="State" id="state" defaultValue="" 
            onChange={e => this.setState({ state: e.target.value })}/><br />               
          <TextField hintText="Zip" floatingLabelText="Zip" id="zip" defaultValue="" 
            onChange={e => this.setState({ zip: e.target.value })}/><br />  
          <FlatButton label="Cancel" primary={true} onTouchTap={this.handleModalClose.bind(this)}/>
          <FlatButton label="Submit" primary={false} onTouchTap={this.onSubmit.bind(this)}/>
        </Dialog>        
      </div>
    );
  }
}
