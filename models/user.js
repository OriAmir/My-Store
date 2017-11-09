var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    products :[{ type: Schema.Types.ObjectId ,ref:'Product'}],
    role: {type: Number, required: true},
    registered:{type: Boolean ,required: true},
    randomKey: {type:String,required:true},
});

schema.plugin(mongooseUniqueValidator);


schema.statics.addUser = function (user,cb) {
   user.save(cb);
}

schema.statics.getUsers = function (cb) {
        return this.model('User').find(cb);
      }

module.exports = mongoose.model('User', schema);