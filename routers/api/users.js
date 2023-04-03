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
router.put('/users', async function (req, res, next) {
  console.log('log =' + req.body)
  await User.findOne({ email: req.body.user.email }).then((user) => {
    user.status = false
    return res.send('thanh cong')
  })
})
router.post('/users/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, function (
    err,
    user,
    info,
  ) {
    if (err) {
      return next(err)
    }

    if (user) {

      // if (!user.status)
      // {
        console.log("vao")
        user.status = true
        user.save()
        user.token = user.generateJWT()
        return res.json({ user: user.toAuthJSON() })
      // }
      //  else
      //  {
      //   console.log("k vao")

      //   return res.status(515).json("da dang nhap")
      //  }
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})
router.post('/users/logout', async function (req, res, next) {
  console.log("logout");
  await User.updateOne({ ID: req.body.user.ID }, { status : false});
  return res.send(req.body)
})

router.post('/users/signup', function (req, res, next) {
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
router.post('/users/join',async function (req, res, next) {
  console.log(req.body.user.username)
 await Room.findOne({ IDroom: req.body.user.IDroom }).then((room) => {
    console.log(' room' + room)
    if (room.listPlayers.length < room.countPlayer) {
      if (!room.listPlayers) {
        const players = []
        players.push(req.body.user.username)
        room.listPlayers = players
        return res.json('Update thanh cong')
      } else room.listPlayers.push(req.body.user.username)
      room.save()
    } else console.log('room full')
  })
})
router.post('/users/exitjoin',async function (req, res, next) {
  console.log(req.body.user.username)
 await Room.findOne({ IDroom: req.body.user.IDroom }).then((room) => {
    console.log(room)
    var index = room.listPlayers.indexOf(req.body.user.username)
    if (index === 0) {
      console.log('xoas phong')
      room.DeleteRoom(req.body.user.IDroom)
    } else {
      room.listPlayers.splice(index, 1)
    }
    room.save()
  })
})

module.exports = router
