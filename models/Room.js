var mongoose = require("mongoose");
var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/authen";

var RoomSchema = new mongoose.Schema(
  {
    IDroom: Number,
    roomName: String,
    countPlayer: Number,
    listPlayers: Array,
  },
  { timestamps: true }
);
RoomSchema.methods.DeleteRoom = function(_IDroom)
{ 
  MongoClient.connect(url, function(err, db) {
    var d = db.db("authen");
    d.collection("rooms").findOneAndDelete({IDroom : _IDroom},  function (err, docs) {
     if (err) {
       console.log(err);
     } else {
       console.log("delete room : ", docs);
     }
   });
  });
};
mongoose.model("Room", RoomSchema);
