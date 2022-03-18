const mongoose = require("mongoose")

const schema = new mongoose.Schema({

    comment: {
        type: String,
        require: true,
    },

    product_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true },
);

const ProductComment = mongoose.model("ProductComment", schema)

module.exports = ProductComment