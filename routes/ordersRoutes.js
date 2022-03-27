var express = require('express');
var router = express.Router();
var Order = require('../models/orders');
var User = require('../models/user')

// get orders
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try{
        const orders = await Order.find({
            userId: userId
        })
        return res.status(200).json({orders: orders});
    }
    catch(err){
        console.log("orderRoutes.js L14" + err);
        return res.status(501).json({orders: "Unable to get orders"});
    }
})

// add orders
router.post('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const order = new Order({
        userId: userId,
        products: req.body.products,
        deliveryStatus: Math.floor(Math.random() * 4 + 1)
    });

    try{
        await order.save();
        return res.status(200).json({order: order});
    }
    catch(err){
        console.log("orderRoutes.js L30" + err);
        return res.status(200).json({order: "Unable to save order"});
    }
});

module.exports = router;