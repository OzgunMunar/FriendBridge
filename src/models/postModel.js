import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    post: {
        type: String,
        required: [true, 'Post is required.'],
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    comments: [
        { 
            body: String,
            date: Date, 
            likeNumber: Number 
        }
    ],
    postedDate: {
        type: Date,
        default: Date.now
    },
    likeNumber: {
        type: Number,
        default: 0
    },
    imageUrlLink: {
        type: String
    },
    location: {
        type: String
    }

})

const Posts = models.Posts || model('Posts', PostSchema);

export default Posts;