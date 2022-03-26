const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var schema=new Schema({
    mobileNumber:{type:Number,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    address:{type:Array,require:true}
});

schema.statics.hashPassword= (password)=>{
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid= (hashedPassword)=>{
    return bcrypt.compareSync(hashedPassword,this.password);
}

module.exports = mongoose.model('User',schema);