/**
 * Created by ceres on 4/3/16.
 */
var mongoose = require('mongoose');

var MenuSchema = mongoose.Schema({
    "name" : {type: String, default: ''},
    "price": {type: Number, default: 0.0}
}, {collection: "menu"});

module.exports = mongoose.model('Menu', MenuSchema);