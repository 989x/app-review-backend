const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },
    profilePic: {
        type:String,
        required:false,
    },

    realName: {
        type: String,
        required: true,
    },
    typeOrCategory: {
        type: String,
        required: true,
    },
    brandOrCompany: {
        type: String,
        required: true,
    },
    // not sure   
    goodOrNot: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    photo: {
        type:String,
        required:false,
    },

    productComment :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductComment"
        }
    ]
    
},{ timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);