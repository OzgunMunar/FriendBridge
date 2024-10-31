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
    postType: {
        type: String,
        enum: ['FeedPost', 'GroupPost', 'GlobalPost'],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    comments: [
        { 
            creator: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            comment: String,
            date: Date, 
            likedBy: [{
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }]
        }
    ],
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    dislikedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    imageUrlLink: {
        type: String
    },
    location: {
        type: String
    },
    friend: {
        type: String
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Groups'
    }

}, { timestamps: true })

const Posts = models.Posts || model('Posts', PostSchema);

export default Posts;