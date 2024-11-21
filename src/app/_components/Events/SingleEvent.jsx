import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"

const SingleEvent = () => {

    const pathName = usePathname()
    const eventId = pathName.split("/")[3]

    const [event, setEvent] = useState({})

    useEffect(() => {
        
        if(!eventId) {
            return        
        }
        
        const fetchEventData = async() => {

            await axios.get("/api/events/event/", { eventId })
                        .then((response) => {
                            
                            console.log(response)
                            // setEvent(response)

                        })
                        .catch((error) => {
                            toast.error("There's been an error while fetching event data.", { theme: "dark" })
                            console.error(error.message)
                        })

        }
        
        fetchEventData()

    }, [eventId])

    return(
        <div className="w-full h-screen bg-red-300 flex items-center justify-center">
            Single Event
        </div>
    )

}

export default SingleEvent