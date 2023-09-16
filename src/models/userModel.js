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
        default: ''
    },
    city: {
        type: String,
        default: 'unshared'
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
        default: 'unshared',
        match: /^\(\+1\) \d{3} \d{2}-\d{2}$/
    },
    address: {
        type: String,
        default: 'unshared'
    },
    birthday: {
        type: String,
        default: new Date('1900-01-01'),
        match: /^(January|February|March|April|May|June|July|August|September|October|November|December)-\d{2}, \d{4}$/
    },
    passwordToken: String,
    passwordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
})

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;