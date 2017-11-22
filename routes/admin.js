var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Product = require('../models/product');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// router.use('/', function (req, res, next) {
//     console.log("test");
//     console.log(req.cookies.token);
//     jwt.verify("sss", 'secret', function (err, decoded) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not Authenticated',
//                 error: err
//             });
//         }
//         next();
//     })
// });

router.post('/add-product', function (req, res, next) {
    var product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    });

    product.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Product created',
            obj: result
        });
    });
});



router.post('/getPartOfUsers', function (req, response, next) {

    var userRequest=req.body.usersPerPage;
    var userSkip=req.body.pageClicked;
    
    console.log("userRequest => "+userRequest);
    console.log("userSkip => "+userSkip);
    
    User.find({}).skip(userRequest*userSkip).limit(userRequest).exec(function(err,r){

        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        return response.status(201).json({
            message: 'Get Users',
            val:r
            });
        });

})
    

router.get('/getUsersCount',function(req,response,next){

    User.count(function(err, numOfUsers) {
        if (err) {
            console.log(err);
            return response.status(500).json({
                title: 'Server error' ,
                message: 'Please try again later of contact us'
            });
         }
        return response.status(201).json({
            message: 'Get count',
            val:numOfUsers
            });
        });

})


router.get('/getUsers',function(req,response,next){
    
 
        User.getUsers(function(err, users) {
    
            
            if (err) {
                console.log(err);
                return response.status(500).json({
                    title: 'Server error' ,
                    message: 'Please try again later of contact us'
                });
             }
            return response.status(201).json({
                message: 'Get Users',
                val:users
                });
            });
    })


module.exports = router;
