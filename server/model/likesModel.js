
const likesSchema = mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video:{ type: mongoose.Schema.Types.ObjectId, ref: 'Videos', required: true },
    createdAt: { type: Date, default: Date.now }
});



const likesModel = mongoose.model("Likes", likesSchema);