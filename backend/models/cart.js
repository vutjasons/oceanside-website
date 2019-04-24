const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  dateCreated: { type: Number}
});


module.exports = mongoose.model('Cart', cartSchema);
