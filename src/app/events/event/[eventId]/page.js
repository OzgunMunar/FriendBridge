"use client"

import SingleEvent from "@/app/_components/Events/SingleEvent"
import LoggedInLayout from "@/app/_components/LoggedInLayout/LoggedInLayout"

const SingleEventPage = () => {

    return (
        
        <LoggedInLayout>
            <SingleEvent />
        </LoggedInLayout>

    )

}


export default SingleEventPage