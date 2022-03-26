const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var schema=new Schema({
    products:{type:Array,require:true}
});

module.exports = mongoose.model('Cart',schema);