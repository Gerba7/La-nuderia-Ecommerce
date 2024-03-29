const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    personalId: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    products: {
        type: Array,
    },
    amount: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    adressNum: {
        type: Number,
        required: true,
    },
    postal: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
    },
    status: {
        type: String,
        default: "pending"
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    sent: {
        type: Boolean,
        default: false
    },
    course : {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
    }, 
    floor: {
        type: Number,
    },
    apartment: {
        type: String,
    }
    

}, {timestamps: true}

);

module.exports = mongoose.model("Order", OrderSchema);