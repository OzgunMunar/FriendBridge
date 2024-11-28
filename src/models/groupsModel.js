import { Schema, model, models } from "mongoose";

const GroupsSchema = new Schema({
    
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

const Groups = models.Groups || model('Groups', GroupsSchema);

export default Groups;