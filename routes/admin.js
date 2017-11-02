var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Product = require('../models/product');
var jwt = require('jsonwebtoken');

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

    console.log("inside!!!!!!");
    console.log("server side,try to save product")
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


module.exports = router;
