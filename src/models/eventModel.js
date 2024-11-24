import mongoose, { Schema } from "mongoose"

const eventsSchema = new mongoose.Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    eventDescription: {
        type: String
    },
    eventTitle: {
        type: String
    },
    eventLocation: {
        type: String
    },
    eventImageLink: {
        type: String
    },
    eventPrice: {
        price: {
            type: Number
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'TRY', 'CAD', 'AUD', 'CAD', 'INR', 'CNY'],
            default: 'USD'
        }
    },
    eventType: {
        type: String,
        enum: ['Business', 'Meeting', 'Breakfast', 'Lunch', 'Party', 'Fun', 'Other'],
        default: 'Fun'
    },
    eventDate: {
        type: Date
    },
    eventTime: {
        type: String
    },
    eventWeather: {
        type: String
    },
    eventParticipants: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    eventMaybeParticipants: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    eventLikedBy: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    eventComments: [
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
    isActive: {
        type: Boolean
    }

}, { timestamps: true })

const Events = mongoose.models.Events || mongoose.model("Events", eventsSchema)

export default Events