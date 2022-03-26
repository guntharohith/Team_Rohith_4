var express = require('express');
var router = express.Router();
var User=require('../models/user');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcrypt');

//Signup
router.post('/signup',(req,res,next)=>{
  // console.log('users.js 7 '+req.body.email);
    var user= new User({
    mobileNumber:req.body.mobileNumber,
    email:req.body.email,
    password:User.hashPassword(req.body.password),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    address:req.body.address
    })
    
    user.save()
    .then((doc)=>{
    return res.status(201).json(doc);
    })
    .catch((err)=>{
    console.log("users.js L24 "+err);
    return res.status(501).json({message:'error registering user'});
    });
});

//Login
router.post('/login',(req,res,next)=>{
    console.log("users.js L27 "+req.body.password + " "+ req.body.email);
    User.findOne({
    email:req.body.email
    }).exec()
    .then( (doc)=>{
        if(doc){

        console.log('users.js L32 '+doc+ " "+req.body.password+" "+doc.password);
        bcrypt.compare(req.body.password,doc.password, (err,resbcrypt)=>{
            console.log("users.js L37 res= "+resbcrypt+" err = "+err);
            if(err){
            console.log("users.js L38 "+err);
            return res.status(501).json({message:'Invalid credentials'});
            }
            if(resbcrypt){
            console.log('users.js L41 password matched '+res);
            let token=jwt.sign({username:req.body.email},'secret', {expiresIn:'3h'});
            return res.status(200).json({success:true, message:"loginSuccess", token:token, user:doc});
            }
            else {
            // response is OutgoingMessage object that server response http request
            return res.status(200).json({success:false, message: 'password does not match'});
            }
        })
        }
        else{
        console.log("users.js L55 user not registered");
        return res.status(200).json({success:false, message: 'Email not registered'});
        }
    })
    .catch((err)=>{
        console.log("users.js L61 some internal error \n"+err);
        return res.status(501).json({message:''});
    })
})

// Add address
router.put('/addAddress/:userId', (req, res) => {
    const userId = req.params.userId;
    const address = req.body.address;
    console.log("userRoutes.js L69 " + userId + " add: " + address);

    User.findByIdAndUpdate(userId, { useFindAndModify: false, $push: {address: address}})
        .then( (doc) => {
            return res.status(200).json({user:doc});
        })
        .catch( (err) => {
            console.log("userRoutes.js L78 " + err);
            return res.status(501).json({message: "Unable to find user"});
        })
})

// Delete address
router.put('/deleteAddress/:userId', async (req, res) => {
    const userId = req.params.userId;
    const address = req.body.address;       // address to be deleted
    console.log("userRoutes.js L87 " + userId + " add: " + address);
    try{
        const user = await User.findById(userId)
        user.address = user.address.filter((a) => a !== address)
        await user.save()
        return res.status(200).json({address:user.address})
    }
    catch(err){
        console.log("userRoutes.js L95 " + err);
        return res.status(501).json({address: "Unable to delete address"});
    }    
})

// Get address
router.get('/getAddress/:userId', async (req, res) => {
    const userId = req.params.userId;

    try{
        const user = await User.findOne({
            _id: userId
        });
        return res.status(200).json({addresses: user.address});
    }
    catch(err){
        console.log("userRoutes.js L108 " + err);
        return res.status(501).json({addresses: "Unable to get addresses"})
    }
})

module.exports = router;