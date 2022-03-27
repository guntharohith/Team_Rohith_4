const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// This is a cart item
var schema=new Schema({
    name: {type: String, require: true},
    image: {type: String},
    color: {type: String},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    subTotal: {type: Number},
    userId: {type: String, require: true}
});

module.exports = mongoose.model('Cart',schema);