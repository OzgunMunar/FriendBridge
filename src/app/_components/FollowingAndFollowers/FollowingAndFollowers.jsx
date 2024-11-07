import axios from "axios"
import { useState, useEffect } from "react"
import UserRelation from "./UserRelation"
import PageLoader from "@/app/pageloader"
import { toast } from "react-toastify"

const FollowingAndFollowers = ({ relationType, unfollowUser, userId }) => {

    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchData = async() => {
            
            await axios.post('/api/users/followingorfollowerusers', { userId, relationType })
                                    .then((response) => {
                                        setUserList(response.data.data)
                                    })
                                    .catch((error) => {
                                        console.log(error.message)
                                        toast.error("Problem while fetching following users.", { theme: "dark" })
                                    })
                                    .finally(() => {
                                        setLoading(false)
                                    })
                                    
        }

        fetchData()

    }, [])

    return (

        <div className="followingandfollowers_container">

            <div className="followingandfollowers_header">
                <img width="25" height="25" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/50/external-follower-gamification-flaticons-lineal-color-flat-icons.png" alt="external-follower-gamification-flaticons-lineal-color-flat-icons"/>
                <span>{ relationType === "Following" ? "Following Users" : "Followers" }</span>
            </div>

            <div className="followingandfollowers_userinfo_container relative">

                {

                    loading ? <PageLoader /> :
                    userList?.map(user => {

                        return (

                            <div key={user._id} className="w-full h-full">

                                <UserRelation user={user} unfollowUser={unfollowUser} relationType={relationType}/>

                            </div>

                        )

                    })

                }

            </div>

        </div>

    )

}

export default FollowingAndFollowers

