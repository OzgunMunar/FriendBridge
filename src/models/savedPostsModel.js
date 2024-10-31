import mongoose, { Schema } from "mongoose"

const savedPostSchema = new mongoose.Schema({

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    
}, { timestamps: true })

const SavedPosts = mongoose.models.SavedPosts || mongoose.model("SavedPosts", savedPostSchema)

export default SavedPosts