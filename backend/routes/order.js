const express = require('express');

const Order = require("../models/order");

const router = express.Router();

//Creates order
router.post("", (req, res, next) => {
  const order = new Order({
    userId: req.body.userId,
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

router.post('/checkout', (req, res, next) => {
  var stripe = require("stripe")("sk_test_zFu13xn05onBjYAXe16exsFM0001pS32wn");
  console.log(req.body);
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  (async () => {
    const charge = await stripe.charges.create({
      amount: req.body.total * 100,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    });
  })();
})
module.exports = router;
