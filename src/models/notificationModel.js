import mongoose, { Schema } from "mongoose"

const notificationsArraySchema = new mongoose.Schema({

    actorUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    message: String,
    actionRelatedId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    actionType: {
        type: String,
        enum: ['post-related', 'user-related'],
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })

const notificationSchema = new mongoose.Schema({

    agentUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    notifications: [notificationsArraySchema]
    
}, { timestamps: true })

const Notifications = mongoose.models.Notifications || mongoose.model("Notifications", notificationSchema)

export default Notifications