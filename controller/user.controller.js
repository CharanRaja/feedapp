const User = require('../model/user.model');
const ObjectId = require('mongodb').ObjectID;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }
  // Create a User
  const user = new User({
    name: req.body.name,
    email_id: req.body.email_id,
    password: req.body.password,
    gender: req.body.gender,
    mobile: req.body.mobile,
    followed: []
  });
  // Save User in the database
  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};
// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
  User.find({
      _id: {
        $nin: req.query.user_id
      }
    })
    .then(Users => {
      res.send(Users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};
// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }
  // Find User and update it with the request body
  if (req.body.followed) {
    User.updateOne({"_id": ObjectId(req.body.follower_userId)}, {
        $push: {
          "followed": {
            "follows": req.body.current_userId,
            "isFollowed": req.body.followed
          }
        }
      })
      .then(User => {
        if (!User) {
          return res.status(404).send({
            message: "User not found with id " + req.body.current_userId
          });
        }
        res.send(User);
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "User not found with id " + req.body.current_userId
          });
        }
        return res.status(500).send({
          message: "Error updating User with id " + req.body.current_userId
        });
      });
  } else {
    User.updateOne({"_id": ObjectId(req.body.follower_userId)}, {
        $pull: {
          "followed": {
            "follows": req.body.current_userId,
            "isFollowed": true
          }
        }
      })
      .then(User => {
        if (!User) {
          return res.status(404).send({
            message: "User not found with id " + req.body.current_userId
          });
        }
        res.send(User);
      }).catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "User not found with id " + req.body.current_userId
          });
        }
        return res.status(500).send({
          message: "Error updating User with id " + req.body.current_userId
        });
      });
  }
};
// Filtering Users
exports.filterUser = (req, res) => {
  User.find({"$or":[{"name":{'$regex':req.query.userName,'$options':'i'}}]})
  .then(UsersList => {
    var list = UsersList.filter((data)=> { return data._id != req.query.user_id })
    res.send(list);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users List."
    });
  });
}
