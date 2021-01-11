var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
app.use(cors()) // Use this after the variable declaration
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
require('./routes/user.route')(app);
require('./routes/feeds.route')(app);
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
mongoose.Promise = global.Promise;
// define a simple route
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to Feed App"
  });
});
// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
