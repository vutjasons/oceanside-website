const express = require('express');
const app = express();
const itemsRoutes = express.Router();
let Items = require('../models/Items');
// Defined get data(index or listing) route
itemsRoutes.route('/').get(function (req, res) {
  Items.find(function (err, items) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

module.exports = itemsRoutes;
