const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");

//CREAT PRODUCT
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body); 
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

//UPDATE PRODUCT
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product.username === req.body.username) {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedProduct)
            } catch(err){
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can update only your post!")
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product.username === req.body.username) {
            try {
                await product.delete();
                res.status(200).json("product has been delete...")
            } catch(err){
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your post!")
        }
    } catch(err) {
        res.status(500).json(err)
    }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json(err);
    }
})

//GET ALL PRODUCT 
router.get("/", async(req, res) => {
    const username = req.query.user;

    // nothing else if categorises
    try {
        let products;
        if(username){
            products = await Product.find({username})


        } else {
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json(err);
    }
}) 

module.exports = router 