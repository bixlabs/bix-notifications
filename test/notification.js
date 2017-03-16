import socketIo from 'socket.io'; // eslint-disable-line import/no-extraneous-dependencies
import Notification from '../src/index';
import MongoNotificationDatabase from '../src/notifications/contracts/mongo-database-example';
import databaseConnection from '../src/notifications/contracts/mongo-connection-example';

const notificationDatabase = new MongoNotificationDatabase();
databaseConnection.connect({
  host: process.env.MONGODB_SERVICE_HOST,
  name: process.env.MONGODB_TEST_DATABASE,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD
});

const io = socketIo();
const notification = new Notification(notificationDatabase);
notification.startServer(io);
io.listen(3000);

export default notification;
