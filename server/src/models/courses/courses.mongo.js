const mongoose = require('mongoose');


const CoursesSchema = new mongoose.Schema({

    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    metadata: {
        type: String,
    },
    urls: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dolarPrice: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
    },
    pdfs: {
        type: Array,    
    },




}, {timestamps: true}

);

module.exports = mongoose.model('Course', CoursesSchema);