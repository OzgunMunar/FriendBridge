import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: String,
        required: [true, 'Post is required.'],
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }

})

const Posts = models.Posts || model('Posts', PostSchema);

export default Posts;