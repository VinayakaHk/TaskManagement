const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({

    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, default: true },
    picture: { type: String },
    googleId: { type: String },
    createdAt: { type: Date, default: new Date().toISOString() },

});

const user = mongoose.model('users', schema);

module.exports = user;
