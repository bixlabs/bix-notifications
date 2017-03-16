const chance = require('chance').Chance(); // eslint-disable-line import/no-extraneous-dependencies

const notificationTypes = ['web', 'mobile'];

chance.mixin({
  notification: (userId) => {
    const data = {
      to: userId,
      type: chance.pickone(notificationTypes),
      title: chance.sentence({ words: 5 }),
      message: chance.paragraph({ sentences: 1 }),
      unread: true,
      sent: false,
      createdAt: chance.date()
    };
    return data;
  }
});

export default chance;
