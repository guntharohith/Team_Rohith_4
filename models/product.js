const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var schema=new Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    images:[{type:String}],
    colors:[{type:String}],
    company:{type:String,require:true},
    stock:{type:Number,require:true},
    rating:{type:Number,require:true},
    category:{type:String,require:true},
    shipping:{type:Boolean,require:true}    //Shipping free means shipping:true

});

module.exports = mongoose.model('Product',schema);