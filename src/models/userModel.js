import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true
    },
    userCodeName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    userImageLink: {
        type: String,
        default: ''
    },
    profession: {
        type: String,
        default: 'unshared'
    },
    personalwebsite: {
        type: String,
        default: 'unshared'
    },
    phonenumber: {
        type: String,
        default: 'unshared'
    },
    address: {
        type: String,
        default: 'unshared'
    },
    birthday: {
        type: String,
        default: 'unshared',
    },
    gender: {
        type: String,
        default: 'unshared',
    },
    followingPeople: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    followedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    passwordToken: String,
    passwordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
}, { timestamps: true })

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;