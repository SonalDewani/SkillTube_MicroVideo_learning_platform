
const commentSchema = mongoose.Schema({
    content:{ type: String, required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video:{ type: mongoose.Schema.Types.ObjectId, ref: 'Videos', required: true },
    createdAt: { type: Date, default: Date.now }
});



const commentModel = mongoose.model("comment", commentSchema);