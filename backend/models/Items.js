const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Items = new Schema ({
  item_name: {
    type: String
  },
  item_price: {
    type: Number
  },
  item_stock: {
    type: Number
  }
},{
  collection: 'items'
});

module.exports = mongoose.model('Items', Items);
