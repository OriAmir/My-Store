var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var passport=require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

//Config files for secret and client id
var config_facebook = require('../config/facebookAppDetails');
var config_token = require('../config/token');
var config_passport = require('../config/passport');
config_passport();


router.post('/auth/facebook', passport.authenticate('facebook-token',{session: false}),
            function (req, res) {

                var temp_user={
                    'id':req.user._id,
                    'email': req.user.email,
                    'role':req.user.role
                };

                var token = jwt.sign({user: temp_user}, config_facebook.clientSecret, {expiresIn: 86400});
                res.cookie('token',token);

                res.status(200).json({
                    message: 'Successfully logged in',
                    val:temp_user
                });
            }
 );


    
 router.post('/isAuthorized', function (req, res, next) {

    jwt.verify(req.cookies.token,config_token.secret, function (err, decoded) {
        if (err) {

            jwt.verify(req.cookies.token, config_facebook.clientSecret, function (err, decoded) {

                if(err)
                    return res.status(401).json({
                        title: 'Login Failed' ,
                        message: 'You are Not Authenticated'
                    });
                
                    return res.status(201).json({
                        message: 'User authorized',
                        val: decoded
                    });
            })                

          
          //  return next();
        }
        res.status(201).json({
            message: 'User authorized',
            val: decoded
        });
        })
    });


router.post('/signup', function (req, response, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        products:req.body.products,     
        role:50,
        registered:req.body.registered,
        randomKey:req.body.randomKey
    });

    User.addUser(user,function(err, userSaved) {

        if(!userSaved)
            return response.status(500).json({
                title: 'Email alredy exist' ,
                message: 'Try with another email address'
            });

        if (err) {
            console.log(err);
            return response.status(500).json({
                title: 'Server error' ,
                message: 'Please try again later of contact us'
            });
         }
        return response.status(201).json({
            message: 'User saved to database success',
            val:userSaved
            });
        });
        
})


router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {

        if (err) {
            return res.status(500).json({
                title: 'Server error' ,
                message: 'Please try again later of contact us'
            });
        }
        if (!user) {
              return res.status(401).json({
                        title: 'Login Failed' ,
                        message: 'User not exist'
                    });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login Failed' ,
                message: 'Your authntication failed'
            });
        }

        var temp_user={
            'id':user._id,
            'firstName': user.firstName,
            'role':user.role
        };
        
        var token = jwt.sign({user: temp_user}, config_token.secret, {expiresIn: 86400});
        res.cookie('token',token);
        res.status(200).json({
            message: 'Successfully logged in',
            val:temp_user
        });
    });
});


router.post('/confirmkey', function(req, res, next) {

    User.findOne({randomKey: req.body.randomKey}, function(err, user) {    
        if (err) {
            return res.status(500).json({
                title: 'Server error' ,
                message: 'Please try again later of contact us'
            });
        }

        if(!user)
        {
            return res.status(401).json({
                title: 'Errro' ,
                message: 'User not exist'
            });

        }
        if (user) {

            user.registered=true;
            user.randomKey=-1;

            user.save(function(err,user){

                if(!user || err)
                    return res.status(401).json({
                        title: 'Server error' ,
                        message: 'Please try again later of contact us'
                    });

                return res.status(200).json({
                    title: 'Success' ,
                    message: 'Now you could log-in with your username and password',
                    val:user
                });

            })
          
        }


    });
});





module.exports = router;
