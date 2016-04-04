var mongoose = require('mongoose');

var FoodSchema = mongoose.Schema({
    "name" : {type: String, default: ''},
    "price": {type: Number, default: 0.0}
}, {collection: "food"});

module.exports = mongoose.model('Food', FoodSchema);