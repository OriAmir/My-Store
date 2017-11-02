var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var User = require('../models/user');

router.get('/getProducts', function (req, res, next) {
    Product.find()
        .exec(function (err, products) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success to get all products',
                obj: products
            });
        });
});

router.post('/getProduct', function (req, res, next) {
    Product.findById(req.body.productId)
        .exec(function (err, product) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success to get product',
                obj: product
            });
        });
});


router.post('/addProductToUser', function (req, res, next) {

    var productId=req.body.productId;
    console.log("product id:"+productId);
    console.log("userid:"+req.body.userId);
    User.update(
        {
            _id: req.body.userId
        },
        {$push:{"products":productId}}
    )    .exec(function (err, product) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success to save product',
            obj: product
        });
    });


});
module.exports = router;
