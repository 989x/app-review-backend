const Product = require("./../models/Product");
const ProductComment = require('./../models/ProductComment');
const mongoose = require("mongoose")

// Get 
exports.list = (req, res) => {
    let product_id = req.params.product_id;
    if(!mongoose.Types.ObjectId.isValid(product_id)){
        return res.status(400).send({
            message: "Invalid blog id",
            data: {}
        });
    }
    Product.findOne({_id:product_id}).then(async(product) => {
        if(!product){
            return res.status(400).send({
                message: 'No product found',
                data: {}
            });
        } else {

            try {
                let query = [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "user_id",
                            foreignField: "_id",
                            as: "user"
                        },
                        
                    },
                    {$unwind: "$user"},
                    {
                        $match: { 
                            "product_id": mongoose.Types.ObjectId(product_id)
                        }
                    },
                    {
                        $sort: {
                            createAt: -1
                        }
                    }
                ];
    
                let total = await ProductComment.countDocuments(query);
                let page = (req.query.page)?parseInt(req.query.page):1;
                let perPage = (req.query.perPage)?parseInt(req.query.perPage):10;
                let skip = (page-1)*perPage;
                query.push({
                    $skip: skip,
                });
                query.push({
                    $limit: perPage,
                })
    
    
                let comments = await ProductComment.aggregate(query); 
                return res.send({
                    message: "Comment successfully fetch",
                    data: {
                        comments: comments,
                        meta: {
                            total: total,
                            currentPage: page,
                            perPage: perPage,
                            totalPages: Math.ceil(total/perPage)
                        }
                    }
                });
                
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




// Create
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
                // new
                let query = [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "user_id",
                            foreignField: "_id",
                            as: "user"
                        },       
                    },
                    {$unwind: "$user"},
                    {
                        $match: { 
                            "_id": mongoose.Types.ObjectId(commentData._id)
                        }
                    }
                ];
                let comment = await ProductComment.aggregate(query);
                // new
                console.log(product);
                return res.status(200).send({
                    message: "Comment successfully added",
                    // data: commentData
                    data: comment[0]
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




// Update
exports.update = async(req, res) => {
    let comment_id = req.params.comment_id;
    if(!mongoose.Types.ObjectId.isValid(comment_id)){
        return res.status(400).send({
            message:"Invalid comment id",
            data: {}
        })
    }
    ProductComment.findOne({_id:comment_id}).then(async(comment) => {
        if(!comment){
            return res.status(400).send({
                message: "No comment found",
                data: {}
            })
        } else{
            let current_user = req.body.user_id;
            console.log("-Up- comment.user_id : " + comment.user_id)
            console.log("-Up- req.body.user_id : " + req.body.user_id)

            if(comment.user_id != current_user){
                return res.status(400).send({
                    message: "Access denied",
                    data: {}
                });
            } else {
                try {
                    await ProductComment.updateOne({_id: comment_id}, {
                        comment: req.body.comment
                    });
                    let query = [
                        {
                            $lookup:
                            {
                                from: "users",
                                localField: "user_id",
                                foreignField: "_id",
                                as: "user"
                            }
                        },
                        {$unwind: "$user"},
                        {
                            $match: {
                                "_id":mongoose.Types.ObjectId(comment_id)
                            }
                        }
                    ];
                    // console.log(comment)


                    let comments = await ProductComment.aggregate(query);
                    return res.status(200).send({
                        message: "Comment successfully updated",
                        data: comments[0]
                    })

                } catch(err) {
                    return res.status(400).send({
                        message: err.message,
                        data: err
                    })
                }
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    })
}




// Delete
exports.delete = async(req, res) => {
    let comment_id = req.params.comment_id;
    if(!mongoose.Types.ObjectId.isValid(comment_id)){
        return res.status(400).send({
            message:"Invalid comment id",
            data: {}
        });
    }
    ProductComment.findOne({_id:comment_id}).then(async(comment) => {
        if(!comment){
            return res.status(400).send({
                message: "No comment found",
                data: {}
            });
        } else{
            let current_user = req.body.user_id;
            console.log("-De- comment.user_id : " + comment.user_id)
            console.log("-De- req.body.user_id : " + req.body.user_id)

            if(comment.user_id.toString() != current_user){
            // if(comment.user_id != current_user){
                return res.status(400).send({
                    message: "Access denied",
                    data: {}
                });
            } else {
                try { 
                    await ProductComment.deleteOne({_id:comment_id})
                    await Product.updateOne(
                        {_id: comment.product_id},
                        {
                            $pull:{productComment: comment_id}
                            // $pull:{blog_comments: comment_id}
                        }
                    )

                    return res.status(200).send({
                        message:"Comment successfully deleted",
                        data: {}
                    })  
                } catch(err){
                    return res.status(400).send({
                        message: err.message,
                        data: err
                    })
                }
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        })
    })
}