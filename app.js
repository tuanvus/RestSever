var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

//var isProduction = process.env.NODE_ENV === 'production';

var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));


mongoose.set('strictQuery',false);
const connectDB = async ()=>
{
try{
  const conn = await mongoose.connect(process.env.MONGO_URI);
}
catch
{
  process.exit(1);
}


}
app.get('/',(req,res)=>
{

  res.send({title : "Books"})
})

app.get('/add',async(req , res)=>
{
try
{
  user = new User()

user.username = req.body.user.username
user.email = req.body.user.email
user.ID = req.body.user.ID
user.setPassword(req.body.user.password)
user.status = false

user
  .save()
  .then(function () {
    return res.json({ user: user.toAuthJSON() })
  })
  .catch(next)
}
catch
{

}

})

// if (!isProduction) {
//   app.use(errorhandler());
// }

// if(isProduction){
//   mongoose.connect(process.env.MONGODB_URI);
// // } else {
// //   mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true},).then(()=> {
// //     console.log("Connect successfully");
// //   }).catch((err) => {
// //     console.log("Connect unsuccessfully");
// //     console.log(err);
// //   });
//   mongoose.set('debug', true);
// }
const User = require('./models/User');
require('./models/User');
require('./models/Room');
require('./config/passport');

app.use(require('./routers'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// // finally, let's start our server...
// var server = app.listen( process.env.PORT || 3000, function(){
//   console.log('Listening on port ' + server.address().port);
// });
connectDB().then(()=>
{

  app.listen(PORT,()=>
  {
    console.log('Listening on port ${PORT}')
  })
})