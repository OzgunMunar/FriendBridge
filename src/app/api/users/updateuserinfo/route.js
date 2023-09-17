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

        console.log(userid)
        console.log(city)
        console.log(user)
        
        user.city = city
        user.phonenumber = phonenumber
        // user.phonenumber = '+1 416 877 78-05'

        await user.save()
        // console.log(user)

        return NextResponse.json({
            message: 'User updated',
            success: true
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }

}