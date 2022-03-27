const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    userId: {type: String, require: true},
    products: [{type: Object, require: true}]
})

module.exports = mongoose.model('Order', schema);