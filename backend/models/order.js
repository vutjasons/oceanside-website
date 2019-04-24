const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  datePlaced: { type: String},
  fname: { type: String},
  lname: { type: String },
  address: { type: String},
  city: { type: String},
  state: { type: String},
  zipcode: { type: String},
  cardNum: { type: String},
  cvc: { type: String},
  totalCost: { type: Number},
  items: [{}],
});


module.exports = mongoose.model('Order', orderSchema);
