const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/TuanAnh');

// const MyModel = mongoose.model('MyModel');

const MySchema = new Schema({
    name : String,
    age : String
});

// const MyModel = mongoose.model('MyModel',MySchema);

// var obj = new MyModel();

// obj.name = "Dung";

// obj.age = "19";

// obj.save();