/* eslint-disable no-unused-expressions */
import chai from 'chai';
import io from 'socket.io-client';
import notification from '../notification';
import helpers from '../helpers';

const expect = chai.expect;

describe('Notifications', () => {
  const scoketUrl = 'http://localhost:3000';
  const sentNotificationEvent = 'sent-notification';
  const userId = helpers.guid();
  let client;
  let notificationData;

  before((done) => {
    client = io.connect(scoketUrl);
    client.emit('check-in', { id: userId }, () => {
      done();
    });
  });

  it('should create a notification', (done) => {
    const newNotification = helpers.notification(userId);
    notification.create(newNotification)
    .then((response) => {
      expect(response).to.not.be.null;
      notificationData = response;
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('should send a notification using the socket', (done) => {
    client.on(sentNotificationEvent, (notificationToSend, ack) => {
      expect(notificationToSend).to.not.be.null;
      ack(notificationToSend);
    });
    notification.send(sentNotificationEvent, notificationData)
      .then((updatedNotification) => {
        expect(updatedNotification.sent).to.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should send all unread notifications to the user', (done) => {
    client.on('unread', (notificationToSend, ack) => {
      expect(notificationToSend).to.not.be.null;
      ack(notificationToSend);
    });
    notification.sendUnread(userId)
      .then((notifications) => {
        expect(notifications).not.to.be.null;
        expect(notifications).to.be.an('array');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should send all unsent notifications to the user', (done) => {
    client.on('news', (notificationToSend, ack) => {
      expect(notificationToSend).to.not.be.null;
      ack(notificationToSend);
    });
    notification.sendUnsent(userId)
      .then((notifications) => {
        expect(notifications).not.to.be.null;
        expect(notifications).to.be.an('array');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  after(() => {
    client.disconnect();
  });
});
