import {ConnectToDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request){

    try {
        
        await ConnectToDB()

        const reqBody = await request.json()
        const {username, email, password, gender} = reqBody
        
        let userImageLink = ""
        let lastIndexOfUserCodeNames
        let userCodeName

        // check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message: "Email is actively being used by another user."}, {status: 400})
        }

        if(gender === "Female") {
            userImageLink = "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg"
        } else {
            userImageLink = "https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const userCodeNameTemporary = username.replace(/\s+/g, "").toLowerCase()
        const searchUserForCodeNames = await User.find({ userCodeName: { $regex: `^${userCodeNameTemporary}`, $options: 'i' } })

        if(searchUserForCodeNames) {
            userCodeName = `${userCodeNameTemporary}${searchUserForCodeNames.length}`
        } else {
            userCodeName = userCodeNameTemporary
        }

        const newUser = new User({
            username,
            userCodeName,
            email,
            password: hashedPassword,
            gender,
            userImageLink: userImageLink
        })

        const savedUser = await newUser.save()
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}