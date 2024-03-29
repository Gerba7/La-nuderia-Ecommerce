const mongoose = require('mongoose');


const ProductsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: Array,
    },
    categories: {
        type: String,
    },
    size: {
        type: Array,
    },
    color: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    discount: {
        type: Boolean,
        default: false,
    },
    discountAmount: {
        type: Number,
    },
    weight: {
        type: Number,
    }


}, {timestamps: true}

);

module.exports = mongoose.model("Product", ProductsSchema);