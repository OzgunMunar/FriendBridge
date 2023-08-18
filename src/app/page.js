'use client'

import { useEffect, useState, createContext, useContext } from "react";
import LeftSideBar from "./_components/LeftSideBar";
import Navbar from "./_components/Navbar";
import axios from "axios";
import CreatePost from "./_components/CreatePost";
import '@/app/_styles/mainpage.css'
import Feed from "./_components/Feed";
import { UserContext, FeedChangeContext } from "./_components/Contexts";

export default function Home() {

  const [user, setUser] = useState('');
  const [isVerified, setIsVerified] = useState(true)
  const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)

  const logout = async () => {

    try {
        
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/login')

    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }

  }

  useEffect(() => {

    const fetchUserData = async() => {

      try {
      
        const loggedUser = await axios.get('api/users/me')
        const user = loggedUser.data.data

        user.isVerified === false && setIsVerified(false)

        setUser(user)
  
      } catch (error) {
        console.log(error)
      }

    }

    fetchUserData();

  },[])

  return (isVerified === true) ? (
    <main>
      <UserContext.Provider value={{ user }}>
        <Navbar/>
        <div className='body_sections'>

          <LeftSideBar/>
          <div className='posts_section'>
            <div className='post_elements'>
              <FeedChangeContext.Provider value={{ shouldFeedChange, setShouldFeedChangeSwitch }}>
                <CreatePost />
                <div className="horizontal_line"></div>
                <Feed />
              </FeedChangeContext.Provider>
            </div>
          </div>

        </div>
      </UserContext.Provider>
    </main>
  ): (
    <main className="verification_warning_text">
      <p>Please verify your account by using verification mail you got. Thank you.</p>
      <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded mt-4">
              LogOut
      </button>
    </main>
    )
}
