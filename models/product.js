var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: false},
    image: {type: String, required: false}
    
});

// schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Product', schema);
