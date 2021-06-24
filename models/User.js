const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email: { type: String, required: true, unique: true },
    registeredAt: { type: Date, index: true }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }