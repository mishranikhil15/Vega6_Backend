const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },
    profileImage: { type: String }
}, { timestamps: true });

const Usermodel = mongoose.model("user", UserSchema)

module.exports = {
    Usermodel
}
