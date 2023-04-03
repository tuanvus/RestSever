var mongoose = require("mongoose");
var router = require("express").Router();
var Room = mongoose.model("Room");
var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/authen";
router.post("/room/create", function (req, res, next) {

    var room = new Room();
    room.roomName = req.body.room.name;
    room.countPlayer = req.body.room.countPlayer;
    room.IDroom = req.body.room.IDroom;
    room
      .save()
      .then(function () {
        return res.send("save thanh cong");
      })
      .catch(next);
  });
  module.exports = router;