const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    userId: {type: String, require: true},
    products: [{type: Object, require: true}],
    creationDate: {type: String, require: true},
    subTotal: {type: Number, require: true},
    deliveryStatus: {type: Number}
})

module.exports = mongoose.model('Order', schema);