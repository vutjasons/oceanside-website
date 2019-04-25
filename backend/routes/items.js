const express = require('express');

const Item = require("../models/item");

const router = express.Router();

//Creates item
router.post("", (req, res, next) => {
  const item = new Item({
    itemName: req.itemName,
    itemSize: req.body.itemSize,
    itemGender: req.body.itemGender,
    itemType: req.body.itemType,
    itemPrice: req.body.itemPrice,
    itemStock: req.body.itemStock,
    itemImg: req.body.itemImg
  });
  item.save().then(createdItem => {
    res.status(201).json({
      message: "Item added successfully",
      itemId: createdItem._id
    });
  });
});

//Updates item information
router.put("/:id", (req, res, next) => {
  const item = new Item({
    _id: req.body.id,
    itemName: req.body.itemName,
    itemSize: req.body.itemSize,
    itemGender: req.body.itemGender,
    itemType: req.body.itemType,
    itemPrice: req.body.itemPrice,
    itemStock: req.body.itemStock,
    itemImg: req.body.itemImg,
  });
  Item.updateOne({ _id: req.params.id }, item).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

//Retreives all items
router.get("", (req, res, next) => {
  Item.find().then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives male item type sweater
//documents represent the data returned from database
router.get("/men", (req, res, next) => {
  Item.find({itemGender: 'M'}).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives male item type sweater
//documents represent the data returned from database
router.get("/men/sweater", (req, res, next) => {
  Item.find({itemType: 'Sweater', itemGender: 'M'}).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives male item type pants
//documents represent the data returned from database
router.get("/men/pants", (req, res, next) => {
  Item.find({ itemType: 'Pants', itemGender: 'M' }).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives female item type sweater
//documents represent the data returned from database
router.get("/women", (req, res, next) => {
  Item.find({ itemGender: 'F' }).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives female item type sweater
//documents represent the data returned from database
router.get("/women/sweater", (req, res, next) => {
  Item.find({ itemType: 'Sweater', itemGender: 'F' }).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives female item type pants
//documents represent the data returned from database
router.get("/women/pants", (req, res, next) => {
  Item.find({ itemType: 'Pants', itemGender: 'F' }).then(documents => {
    res.status(200).json({
      message: "Items fetched successfully!",
      items: documents
    });
  });
});

//Retreives specific items information
router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id).then(item => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found!" });
    }
  });
});

//Removes item
router.delete("/:id", (req, res, next) => {
  Item.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Item deleted!" });
  });
});

module.exports = router;

