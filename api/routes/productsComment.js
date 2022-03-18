const router = require("express").Router();
const productController = require("./../controllers/productComment")


// const ProductComment = require("../models/ProductComment");

// // Post Comment

// router.post("/" , async (req, res) => {
    //     const newProductComment = new ProductComment(req.body);
    //     try {
        //         const saveProductComment = await newProductComment.save();
        //         res.status(200).json(s aveProductComment);
        //     } catch(err) {
            //         res.status(500).json(err)
            //         console.log(err)
            //     }
            // })
            
            
router.post("/:product_id/comments/create", productController.create)
router.put("/comments/:comment_id/update", productController.update)
router.delete("/comments/:comment_id/delete", productController.delete)

module.exports = router 