var express = require('express');
var router = express.Router();
var Product = require('../models/product');

//Get all products
router.get('/', async(req, res) => {
    try{
        return res.status(200).json({products: await Product.find()});
    }
    catch(err){
        console.log("productRoutes.js L11 " + err);
        return res.status(501).json({products: "Unable to get products"});
    }
})

//Get products by id
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;

    try{
        const product = await Product.findOne({
            _id: productId
        });
        return res.status(200).json({product: product});
    }
    catch(err){
        console.log("productRoutes.js L27 " + err);
        return res.status(501).json({product: "Unable to get product"});
    }
});

// Add products
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images,
        colors: req.body.colors,
        company: req.body.company,
        stock: req.body.stock,
        rating: req.body.rating,
        category: req.body.category,
        shipping: req.body.shipping
    });


    try{
        const products = await product.save();
        return res.status(200).json({products: products});
    }
    catch(err){
        console.log("productRoutes.js L53 " + err);
        return res.status(501).json({products: "Unable to add products"});
    }
})

module.exports = router;