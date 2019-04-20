const express = require('express');

const Order = require("../models/order");

const router = express.Router();

//Creates order
router.post("", (req, res, next) => {
  const order = new Order({
    datePlaced: req.body.datePlaced,
    fname: req.body.userInfo.fname,
    lname: req.body.userInfo.lname,
    address: req.body.userInfo.address,
    city: req.body.userInfo.city,
    state: req.body.userInfo.state,
    zipcode: req.body.userInfo.zipCode,
    cardNum: req.body.userInfo.cardnumber,
    cvc: req.body.userInfo.cvc,
    items: req.body.item,
    totalCost: req.body.total,
  });
  order.save().then(createdItem => {
    res.status(201).json({
      message: "Order added successfully",
    });
  });
});

module.exports = router;
