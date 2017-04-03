import chai from 'chai';
import NotificationController from '../../src/notifications/controller';
import MockNotificationDatabase from './notificationDatabaseMock';
import helpers from '../helpers';

const expect = chai.expect;
const userId = helpers.guid();
const NOTIFICATION_ID = 1;
const DEFAULT_LENGTH = NOTIFICATION_ID;
const FIRST = 0;
const objectForFailure = { shouldFail: true };
let controller;

describe('Notifications unit test: Successful cases', () => {
  beforeEach(initializeController);

  it('Should create a notification using promise', async() => {
    let notification = helpers.notification(userId);
    notification = await controller.create(notification);
    expect(notification.id).to.equal(NOTIFICATION_ID);
  });

  it('Should create a notification using callback', async() => {
    const notification = helpers.notification(userId);
    controller.create(notification, (error, result) => {
      expect(result.id).to.equal(NOTIFICATION_ID);
    });
  });

  it('Should update a notification given the id using promise', async() => {
    let notification = helpers.notification(userId);
    notification = await controller.update(NOTIFICATION_ID, notification);
    expect(notification.id).to.equal(NOTIFICATION_ID);
  });

  it('Should update a notification given the id using callback', async() => {
    const notification = helpers.notification(userId);
    controller.update(NOTIFICATION_ID, notification, (error, result) => {
      expect(result.id).to.equal(NOTIFICATION_ID);
    });
  });

  it('Should find all notifications of a user given the user id using promise', async() => {
    const notifications = await controller.findAllByUser(userId);
    expect(notifications).to.have.length.of(DEFAULT_LENGTH);
  });

  it('Should find all notifications of a user given the user id  using callback', async() => {
    controller.findAllByUser(userId, (error, notifications) => {
      expect(notifications).to.have.length.of(DEFAULT_LENGTH);
    });
  });

  it('Should set as read a notification given the id using promises', async() => {
    const notification = await controller.setAsRead(NOTIFICATION_ID);
    expect(notification.id).to.equal(NOTIFICATION_ID);
    expect(notification.unread).to.equal(false);
  });

  it('Should set as read a notification given the id using callback', async() => {
    controller.setAsRead(NOTIFICATION_ID, (error, notification) => {
      expect(notification.id).to.equal(NOTIFICATION_ID);
      expect(notification.unread).to.equal(false);
    });
  });

  it('Should set all notifications of a user as read given the user id using promise', async() => {
    const notifications = await controller.setAllAsRead(userId);
    expect(notifications).to.have.length.of(DEFAULT_LENGTH);
    expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
    expect(notifications[FIRST].unread).to.equal(false);
  });

  it('Should set all notifications of a user as read given the user id using callback', async() => {
    controller.setAllAsRead(userId, (error, notifications) => {
      expect(notifications).to.have.length.of(DEFAULT_LENGTH);
      expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
      expect(notifications[FIRST].unread).to.equal(false);
    });
  });

  it('Should remove a notification given the id using promise', async() => {
    const notification = await controller.remove(NOTIFICATION_ID);
    expect(notification.id).to.equal(NOTIFICATION_ID);
  });

  it('Should remove a notification given the id using callback', async() => {
    controller.remove(NOTIFICATION_ID, (error, notification) => {
      expect(notification.id).to.equal(NOTIFICATION_ID);
    });
  });

  it('Should get all the unread notifications of a user given the id using promise', async() => {
    const notifications = await controller.getAllUnread(userId);
    expect(notifications).to.have.length.of(DEFAULT_LENGTH);
    expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
    expect(notifications[FIRST].unread).to.equal(true);
  });

  it('Should get all the unread notifications of a user given the id using callback', async() => {
    controller.getAllUnread(userId, (error, notifications) => {
      expect(notifications).to.have.length.of(DEFAULT_LENGTH);
      expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
      expect(notifications[FIRST].unread).to.equal(true);
    });
  });

  it('Should get all the unsent notifications of a user given the id using promise', async() => {
    const notifications = await controller.getAllUnsent(userId);
    expect(notifications).to.have.length.of(DEFAULT_LENGTH);
    expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
    expect(notifications[FIRST].sent).to.equal(false);
  });

  it('Should get all the unsent notifications of a user given the id using callback', async() => {
    controller.getAllUnsent(userId, (error, notifications) => {
      expect(notifications).to.have.length.of(DEFAULT_LENGTH);
      expect(notifications[FIRST].id).to.equal(NOTIFICATION_ID);
      expect(notifications[FIRST].sent).to.equal(false);
    });
  });
});

function initializeController(done) {
  controller = new NotificationController(new MockNotificationDatabase());
  done();
}

describe('Notifications unit test: Failure cases', () => {
  beforeEach(initializeController);

  it('Should fail creating a notification using promise', async() => {
    try {
      await controller.create(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail creating a notification using callback', async() => {
    controller.create(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail creating a notification using callback', async() => {
    controller.create(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail updating a notification using promise', async() => {
    try {
      await controller.update(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail updating a notification using callback', async() => {
    controller.update(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail finding all notifications of a user using promise', async() => {
    try {
      await controller.findAllByUser(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail finding all notifications of a user using callback', async() => {
    controller.findAllByUser(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail setting a notification as read using promise', async() => {
    try {
      await controller.setAsRead(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail setting a notification as read using callback', async() => {
    controller.setAsRead(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail setting all notifications of a user as read using promise', async() => {
    try {
      await controller.setAllAsRead(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail setting all notifications of a user as read using callback', async() => {
    controller.setAllAsRead(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail removing a notification using promise', async() => {
    try {
      await controller.remove(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail removing a notification using callback', async() => {
    controller.remove(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail getting all unread notifications of a user using promise', async() => {
    try {
      await controller.getAllUnread(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail getting all unread notifications of a user using callback', async() => {
    controller.getAllUnread(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });

  it('Should fail getting all unsent notifications of a user using promise', async() => {
    try {
      await controller.getAllUnsent(objectForFailure);
    } catch (error) {
      expect(error).to.be.an('Error');
    }
  });

  it('Should fail getting all unsent notifications of a user using callback', async() => {
    controller.getAllUnsent(objectForFailure, (error) => {
      expect(error).to.be.an('Error');
    });
  });
});
