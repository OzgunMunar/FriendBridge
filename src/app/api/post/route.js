import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Posts from "@/models/postModel";
import { getDataFromToken } from "@/helpers/helper";

export const GET = async(req) => {

    try {
        
        await ConnectToDB()

        const userId = await getDataFromToken(req)
        const posts = await Posts.find({ isActive: true, creator: userId })
                                    .sort({"postedDate": -1})
                                    .populate("creator")
                                    .populate({
                                        path: "comments.creator",
                                        select: "username userImageLink"
                                    })

        return NextResponse.json({ posts })

    } catch (error) {

        return new NextResponse({ error: error.message }, {status: 500})

    }

}