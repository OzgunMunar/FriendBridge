import mongoose, { Schema } from "mongoose"

const likedPostSchema = new mongoose.Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }]
    
}, { timestamps: true })

const LikedPosts = mongoose.models.LikedPosts || mongoose.model("LikedPosts", likedPostSchema)

export default LikedPosts