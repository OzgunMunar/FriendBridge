import mongoose, { Schema } from "mongoose"

const groupsSchema = new mongoose.Schema({
    
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    groupName: {
        type: String
    },
    groupType: {
        type: String,
        enum: ['Public', 'Private', 'Authored']
    },
    groupPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }],
    groupMembers: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    
}, { timestamps: true })

const Groups = mongoose.models.Groups || mongoose.model("Groups", groupsSchema)

export default Groups