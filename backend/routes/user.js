const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Password failed"
        });
      }
      else {
        userId: fetchedUser._id;
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      users: documents
    });
  });
});

//Retreives specific items information
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Item not found!" });
    }
  });
});

//Updates item information
router.put("/:id", (req, res, next) => {
  const user = new User({
    fname: req.body.itemName,
    flname: req.body.itemSize,
    email: req.body.itemGender,
    password: req.body.itemType,
  });
  Item.updateOne({ _id: req.params.id }, item).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

module.exports = router;
