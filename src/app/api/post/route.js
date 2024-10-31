import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Posts from "@/models/postModel";

export const GET = async(req) => {

    try {
        
        await ConnectToDB()

        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        const posts = await Posts.find({ isActive: true, creator: userId })
                                    .sort({"createdAt": -1})
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