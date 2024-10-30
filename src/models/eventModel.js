import mongoose, { Schema } from "mongoose"

const eventsSchema = new mongoose.Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    eventTitle: {
        type: String
    },
    eventLocation: {
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
    }

}, { timestamps: true })

const Events = mongoose.models.Events || mongoose.model("Events", eventsSchema)

export default Events