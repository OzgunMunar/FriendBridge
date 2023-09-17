import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";
import Users from "@/models/userModel";

ConnectToDB()

export async function POST(req) {

    try {

        const reqBody = await req.json()
        const { username, userImageLink, address, city, personalwebsite, phonenumber, profession, birthday, gender} = reqBody

        const userid = await getDataFromToken(req)
        const user = await Users.findById({ userid })

        console.table(user)

        // user.username = username
        // user.userImageLink = userImageLink
        // user.address = address
        // user.city = city
        // user.personalwebsite = personalwebsite
        // user.phonenumber = phonenumber
        // user.profession = profession
        // user.birthday = birthday
        // user.gender = gender

        // await user.save()

        const result = NextResponse.json({
            message: 'User updated',
            success: true
        })

        return result

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}