const userSchema = mongoose.Schema({
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, enum:["student","teacher"], default: "student" },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" }
});



const UserModel = mongoose.model("User", userSchema);