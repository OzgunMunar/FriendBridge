import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";
import Users from "@/models/userModel";

export async function POST(req) {

    const reqBody = await req.json()
    const {username, userImageLink, address, city, personalwebsite, phonenumber, profession, birthday, gender} = reqBody

    try {

        ConnectToDB()

        const userid = await getDataFromToken(req)
        const user = await Users.findById(userid)

        const phonenumberRegexPattern = /^\(\+1\) \d{3} \d{3} \d{2}-\d{2}$/
        const birthdayRegexPattern = /^(January|February|March|April|May|June|July|August|September|October|November|December)-\d{2}, \d{4}$/
        const genderRegexPattern = /(Male|Female)/
        
        if(!phonenumberRegexPattern.test(phonenumber)) {
            return NextResponse.json({message: "Phone Number pattern is invalid: Please try the pattern '(+X) XXX XX-XX'"}, {status: 400})
        }

        if(!birthdayRegexPattern.test(birthday)) {
            return NextResponse.json({message: "Birthday pattern is invalid: Please try the pattern 'January-01, 1900'"}, {status: 400})
        }

        if(!genderRegexPattern.test(gender)) {
            return NextResponse.json({message: "Gender pattern is invalid: Please try the pattern 'Male' or 'Female'"}, {status: 400})
        }
        
        user.username = username
        user.userImageLink = userImageLink
        user.address = address
        user.city = city
        user.personalwebsite = personalwebsite
        user.phonenumber = phonenumber
        user.profession = profession
        user.birthday = birthday
        user.gender = gender

        await user.save()

        return NextResponse.json({
            message: 'User updated',
            success: true
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}