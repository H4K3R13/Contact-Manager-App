const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please Add Username"]
    },
    email:{
        type: String,
        required:[true, "Please Add Email"],
        unique:[true, "Email is already taken"]
    },
    password:{
        type: String,
        required:[true, "Please Add Password"]
    },
},{
    timestamp: true,
})

module.exports = mongoose.model("User", userSchema);