var mongoose = require('mongoose')
var router = require('express').Router()
var passport = require('passport')
var User = mongoose.model('User');
var Room = mongoose.model('Room')
var auth = require('../auth')

router.post('/users/getall', async function (req, res, next) {
  const users = await User.find()
  console.log(users)
  return res.send(users)
})

router.post('/users', function (req, res, next) {
  console.log('log =' + req.body.FileBytes)
  return res.send(req.body.todo)
})
router.put('/FindUser', async function (req, res, next) {
  console.log('log =' + req.body)
  await User.findOne({ email: req.body.user.email }).then((user) => {
    user.status = false
    return res.json({ user: user.toAuthJSON() })
  })
})
router.post('/users/Login', function (req, res, next) {
  passport.authenticate('local', { session: false }, function (
    err,
    user,
    info,
  ) {
    if (err) {
      return next(err)
    }

    if (user) {

        console.log("vao")
        user.status = true
        user.save()
        user.token = user.generateJWT()
        return res.json({ user: user.toAuthJSON() })

    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})

router.post('/users/Logout', async function (req, res, next) {
  console.log("logout");
  await User.updateOne({ ID: req.body.user.ID }, { status : false});
  return res.send(req.body)
})

router.post('/users/Register', function (req, res, next) {
  console.log('vao')
  var user = new User()

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
})



module.exports = router
