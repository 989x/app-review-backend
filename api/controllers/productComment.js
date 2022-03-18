const Product = require("./../models/Product");
const ProductComment = require('./../models/ProductComment');
const mongoose = require("mongoose")

exports.create = async(req, res) => {
    let product_id = req.params.product_id;

    if(!mongoose.Types.ObjectId.isValid(product_id)){
        return res.status(400).send({
            message: "Invalid blog id",
            data: {}
        })
    }

    Product.findOne({_id:product_id}).then(async(product) => {
        if(!product){
            return res.status(400).send({
                message: 'No product found',
                data: {}
            });
        } else {

            try {

                let newCommentDocument = new ProductComment({
                    comment: req.body.comment,
                    product_id: product_id,
                    user_id: req.body.user_id
                })
                
                let commentData = await newCommentDocument.save()
    
                await Product.updateOne(
                    {_id:product_id},
                    {
                        $push: { productComment : commentData._id }
                        // $push: { Product_comments : commentData._id }
                    }
                )
    
                console.log(product);
    
                return res.status(200).send({
                    message: "Comment successfully added",
                    data: commentData
    
                })

            } catch(err){
                return res.status(400).send({
                    message:err.message,
                    data:err
                })
            }

        }

    }).catch((err) => {
        return res.status(400).send({
            message:err.message,
            data:err
        })
    })

}