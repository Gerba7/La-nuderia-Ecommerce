const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    adress: {
        type: String,
    },
    orders: {
        type: Number,
    },
    country: {
        type: String,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean, 
        default: false,
    },
    courseAccess: {
        type: Boolean, 
        default: false,
    },
    resetLink: {
        type: String,
        default: '',
    },
    purchases: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
          },
          purchaseDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],

}, {timestamps: true}

);

module.exports = mongoose.model('User', UserSchema);