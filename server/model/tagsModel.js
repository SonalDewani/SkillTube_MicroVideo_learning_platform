
const tagsSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});



const tagsModel = mongoose.model("Tags", tagsSchema);