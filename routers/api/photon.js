var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
const { use } = require('passport');

router.get('/photon', function(req, res, next)
{
    // if(!req.query.email)
    // {
    //     return res.json({"ResultCode": 2});
    // }
    // if(!req.query.password)
    // {
    //     return res.json({"ResultCode": 2});
    // }
    console.log(req.body);

    passport.authenticate('local',{ session: false}, function(err, user, info)
    {
        if(err){return next(err);}

        if(user)
        {
            user.token = user.generateJWT();
            return res.json({"ResultCode": 1, "AuthCookie": user.toAuthJSON()});
        }
        else
        {
            console.log(user);
            return res.json({"ResultCode": 2});
        }
    })(req, res, next);
});

module.exports = router;