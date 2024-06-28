const cron = require('node-cron');

cron.schedule('59 20 * * *', async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/users/inactive_users',
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error deleting inactive users:', err);
  }
});

module.exports = cron;
