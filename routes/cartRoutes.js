var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

// Add to cart
router.post('/:userId', async (req, res) => {
    const userId = req.params.userId;

    const cart = new Cart({
        name: req.body.name,
        image: req.body.image,
        color: req.body.color,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.quantity * req.body.price,
        userId: userId
    })

    try{
        await cart.save();
        return res.status(200).json({cartItem: cart});
    }
    catch(err){
        console.log("cartRoutes.js L23 " + err);
        return res.status(501).json({cartItem: "Unable to save cart item"});
    }
})

// Get cart
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try{
        const cart = await Cart.find({
            userId: userId
        });
        return res.status(200).json({cart: cart});
    }
    catch(err){
        console.log("cartRoutes.js L37 " + err);
        return res.status(501).json({cart: "Unable to get the cart"});
    }
})

// delete cart item
router.delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;

    try{
        const cart = await Cart.findByIdAndDelete(cartId);
        return res.status(200).json({cart: cart});
    }
    catch(err){
        console.log("cartRoutes.js L53 " + err);
        return res.status(501).json({cart: "Unable to delete cart item"});
    }
})

//clear cart
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try{
        const cart = await Cart.deleteMany({userId: userId});
        return res.status(200).json({cart: cart});
    }
    catch(err){
        console.log("cartRoutes.js L53 " + err);
        return res.status(501).json({cart: "Unable to delete cart item"});
    }
})

// update cart item
router.put('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const quantity = req.body.quantity;

    try{
        var cartItem = await Cart.findById({_id: cartId});
        cartItem.quantity = quantity;
        cartItem.subTotal = cartItem.price * quantity;
        cartItem = await Cart.findByIdAndUpdate({_id: cartId}, cartItem, {useFindAndModify: false});
    }
    catch(err){
        console.log("cartRoutes.js L80 " + err);
        return res.status(501).json({cartItem: "Unable to update cart"})
    }
})

module.exports = router;