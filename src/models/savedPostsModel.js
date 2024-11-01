import mongoose, { Schema } from "mongoose"

const savedPostSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    postIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }]
    
}, { timestamps: true })

const SavedPosts = mongoose.models.SavedPosts || mongoose.model("SavedPosts", savedPostSchema)

export default SavedPosts