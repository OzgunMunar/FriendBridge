import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
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
        default: 'unspecified'
    },
    city: {
        type: String,
        default: 'unspecified'
    },
    profession: {
        type: String,
        default: 'unspecified'
    },
    personalwebsite: {
        type: String,
        default: 'unspecified'
    },
    phonenumber: {
        type: String,
        default: 'unspecified',
        match: /^\(\+1\) \d{3} \d{2}-\d{2}$/
    },
    address: {
        type: String,
        default: 'unspecified'
    },
    birthday: {
        type: String,
        default: new Date('1900-01-01'),
        match: /^(January|February|March|April|May|June|July|August|September|October|November|December)-\d{2}, \d{4}$/
    },
    gender: {
        type: String,
        default: 'unspecified',
        match: /^(male|female)$/i
    },
    passwordToken: String,
    passwordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
})

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;