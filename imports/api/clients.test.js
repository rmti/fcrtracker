import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Clients} from './clients';

if (Meteor.isServer) {
  describe('notes', function() {

    const clientOne = {
      _id: 'testClientId1',
      userId: 'testUserId1',
      name: 'John Doe',
      postalAddress: {
        type: 'office',
        use: 'primary',
        street: "99 Main Street",
        city: "Chicago",
        zip: "60606"
      },
      emailAddress: [
        {
          type: 'office',
          use: 'primary',
          email: 'johndoe@example.com'
        }, {
          type: 'personal',
          email: 'johndoe2@example.com'
        }
      ],
      telephone: [
        {
          type: 'office',
          use: 'primary',
          number: '55555512324'
        }, {
          type: 'fax',
          number: '55555512324'
        }
      ],
      updatedAt: 0,
      createdAt: 0
    };

    beforeEach(function() {
      Clients.remove({});
      Clients.insert(clientOne);
    });

    it('should insert new client', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['clients.insert'].apply({userId});
      expect(Clients.findOne({_id, userId})).toExist();
    });

    it('should not insert client if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['clients.insert']();
      }).toThrow();
    });

    it('should remove client', function() {
      Meteor.server.method_handlers['clients.remove'].apply({
        userId: clientOne.userId
      }, [clientOne._id]);
      expect(Clients.findOne({_id: clientOne._id})).toNotExist();
    });

    it('should not remove client if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['clients.remove'].apply({}, [clientOne._id]);
      }).toThrow();
    });
  });
}
