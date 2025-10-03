
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, enum:["student","teacher"], default: "student" },
    profilePicture: { type: String, required: false , default: "" },
    bio: { type: String, default: "" }
},
{ timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password.startsWith("$2a") && !this.password.startsWith("$2b")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);

