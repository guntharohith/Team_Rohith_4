const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var schema=new Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    company:{type:Number,require:true},
    stock:{type:Number,require:true},
    rating:{type:Number,require:true},
    reviews:{type:Array,require:true},
    category:{type:String,require:true},
    shippingFee:{type:String,require:true},
    images:{type:Array,require:true},
    color:{type:String,require:true}

});

module.exports = mongoose.model('Product',schema);