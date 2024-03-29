const mongoose = require('mongoose');


const PostalSchema = new mongoose.Schema({

    weightName: {
        type: String,
        required: true,
        enum: ['1kg', '2kg', '3kg', '5kg', '10kg', '15kg'],
    },
    weight: {
        type: Number,
        required: true,
    },
    zoneA: {
        type: Number,
        required: true,
    },
    zoneB: {
        type: Number,
        required: true,
    },
    zoneC: {
        type: Number,
        required: true,
    },
    zoneD: {
        type: Number,
        required: true,
    },
    

}, {timestamps: true}

);

module.exports = mongoose.model("Postal", PostalSchema);