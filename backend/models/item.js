const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  itemName: { type: String },
  itemSize: { type: String },
  itemGender: { type: String},
  itemType: { type: String},
  itemPrice: { type: Number },
  itemStock: { type: Number },
  itemImg: { type: String },
});


module.exports = mongoose.model('Item', itemSchema);
