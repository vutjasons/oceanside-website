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
        { Email: fetchedUser.email, userID: fetchedUser._id, FirstName: fetchedUser.fname, LastName: fetchedUser.lname },
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

router.get("/forgot/:email", (req,res,next) => {
  User.findOne({email : req.params.email})
    .exec(function(err,User){
      if(!User){
        console.log("Error retrieving user");
        res.status(401).send({
          error: "Password failed"
        })
      }else{
        console.log("Success");   
        res.json(User);
      }
    })
}); 

router.get("/check/:id/:password", function(req, res, next) {
  User.findOne({_id : req.params.id})
  .exec(function(err,User){
    if (err){
      console.log("Error retrieving user");
    }else {

       return bcrypt.compare(req.params.password, User.password, (err,res1) => {
         if (res1) {
           console.log("User Pass: " + User.password);
           console.log("Password : " + bcrypt.hashSync(req.params.password,10));
           console.log("Success");
           res.json(User);
         }else{
            console.log("User Pass:" + User.password);
            console.log("Password: " + bcrypt.hashSync(req.params.password,10));
            console.log("Passwords do not match");
            res.status(401).send({
              error: "Password failed"
            });
         }
       });
    }
  })
})

router.put("/newPass/:email", function(req, res, next) {
  var generatedPass = Math.random().toString(36).replace('0.', '');
  console.log("Generated Pass: " + generatedPass);
  var hash = bcrypt.hashSync(generatedPass, 10);
  User.findOneAndUpdate({email : req.params.email},
    {
      $set: {password : hash}
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user");
      }else{
        // res.json(updatedUser);
        res.json(generatedPass);
      }
    });
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


router.put("/password/:id", function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, 10);
  User.findOneAndUpdate({_id : req.params.id},
    {
      $set: {password : hash}
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user");
      }else{
        res.json(updatedUser);
      }
    }
  );
});


module.exports = router;
