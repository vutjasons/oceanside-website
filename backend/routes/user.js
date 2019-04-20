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
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.post("/check/:id", (req,res,next) => {
  User.findOne({_id : req.params.id})
    .then(function(err,User){
      if(err){
        console.log("Error retrieving user");
      }else{
        let fetchedUser = res.json(User);
        if(bcrypt.compare(fetchedUser.password,req.params.password)){
          console.log("Same Password");
        }else{
          console.log("Different Password");
        }
      }
    })
});

router.get("/retrieve/:id", (req,res,next) => {
  console.log(req.params.id);
  User.findOne({_id : req.params.id})
    .exec(function(err,User){
      if(err){
        console.log("Error retrieving user");
      }else{
        res.json(User);
        }
    })
});

router.put("/:id", function(req, res, next) {
    console.log(req.params);
    User.findOneAndUpdate({_id : req.params.id},
      {
        $set: {fname : req.body.fname, lname: req.body.lname, email: req.body.email}
      },
      {
        new: true
      },
      function(err, updatedUser){
        if(err){
          res.send("Error updating user");
        }else{
          console.log("ID: " + req.params.fname + " fname: " + req.body.fname, " lname: " + req.body.lname + " email: " + req.body.email);
          res.json(updatedUser);
        }
      }
    );
});


module.exports = router;
