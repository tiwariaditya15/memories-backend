import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    creator: String,
    message: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostModel = mongoose.model("PostMessages", postSchema);

export default PostModel;