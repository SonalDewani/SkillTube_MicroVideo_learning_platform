
const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});



const categoryModel = mongoose.model("Category", categorySchema);