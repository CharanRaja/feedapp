const feeds = require('../controller/feeds.controller');
module.exports = function (express) {
  // Create a new user
  express
    .post('/feedPost', feeds.create);
  // Retrieve all feeds
  express
    .get('/feeds', feeds.findAll);
  // Filtering feeds
  express
    .get('/filterByFeeds', feeds.filterFeeds);
}
