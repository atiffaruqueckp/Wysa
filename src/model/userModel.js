const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

}, { versionKey: false })

module.exports = mongoose.model("wysauser", userSchema)