const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true , default: "" },
    password: { type: String, required: true },
    role:{ type: String, enum:["student","teacher"], default: "student" },
    profilePicture: { type: String, required: false , default: "" },
    bio: { type: String, default: "" }
},
{ timestamps: true }
);



module.exports = mongoose.model("User", userSchema);

