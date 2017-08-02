import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Clients = new Mongo.Collection('clients');

if (Meteor.isServer) {
  Meteor.publish('clients', function() {
    return Clients.find({userId: this.userId});
  });
}

Meteor.methods({
  'clients.insert' (details) {
    console.log(this.userId);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Clients.insert({
      userId: this.userId,
      createdAt: moment().valueOf(),
      updatedAt: null,
      ...details
    });
  },
  'clients.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Clients.remove({ _id, userId: this.userId });
  }
});
