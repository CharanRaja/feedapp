const Feeds = require('../model/feeds.model');
const User = require('../model/user.model');
const ObjectId = require('mongodb').ObjectID;
// Create and Save a new Feeds
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Feeds content can not be empty"
    });
  }
  // Create a Feed
  const feeds = new Feeds({
    title: req.body.title,
    description: req.body.description,
    uploadedBy: req.body.uploadedBy
  });
  // Save Feed in the database
  feeds.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Feeds."
      });
    });
};
// Retrieve and return Feeds from the database.
exports.findAll = (req, res) => {
  User.find({
      _id: ObjectId(req.query.user_id)
    })
    .then(userDetails => {
      let dataList = [];
      var userId = userDetails[0]._id.toString();
      dataList.push({
        'id': userId
      });
      userDetails[0].followed.map(list => {
        dataList.push({
          'id': list.follows
        });
      })
      const getData = async () => {
        return Promise.all(
          dataList.map(async (list) => {
            try {
              list.data = await Feeds.find({
                "uploadedBy": list.id
              });
            } catch (err) {
              res.send("Some error occurred while retrieving Feeds.");
            }
          })
        )
      }
      getData().then(() => {
        res.send(dataList);
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};
// Filtering Feeds
exports.filterFeeds = (req, res) => {
  User.find({
      _id: ObjectId(req.query.user_id)
    })
    .then(userDetails => {
      let dataList = [];
      var userId = userDetails[0]._id.toString();
      dataList.push({
        'id': userId
      });
      userDetails[0].followed.map(list => {
        dataList.push({
          'id': list.follows
        });
      });
      const getData = async () => {
        return Promise.all(
          dataList.map(async (list) => {
            try {
              list.data = await Feeds.aggregate([{
                $match: {
                  $and: [{
                    "uploadedBy": list.id
                  }, {
                    "$or": [{
                        "title": {
                          '$regex': req.query.feedsSearch,
                          '$options': 'i'
                        }
                      },
                      {
                        "description": {
                          '$regex': req.query.feedsSearch,
                          '$options': 'i'
                        }
                      }
                    ]
                  }]
                }
              }]);
            } catch (err) {
              res.send("Some error occurred while retrieving Feeds.");
            }
          })
        )
      }
      getData().then(() => {
        res.send(dataList);
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
}
