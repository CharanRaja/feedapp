const users = require('../controller/user.controller');
module.exports = function (express) {
  // Create a new user
  express
    .post('/user', users.create);
  // Retrieve all users
  express
    .get('/users', users.findAll);
  // Upadte a single user with userId
  express
    .post('/followUser', users.update);
  // Filte users by user name
  express
    .get('/filterByUser', users.filterUser);
}
