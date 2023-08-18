'use client'

import { useEffect, useState, createContext, useContext } from "react";
import LeftSideBar from "./_components/LeftSideBar";
import Navbar from "./_components/Navbar";
import axios from "axios";
import CreatePost from "./_components/CreatePost";
import '@/app/_styles/mainpage.css'
import Feed from "./_components/Feed";
import { UserContext } from "./_components/Contexts";

export default function Home() {

  const [user, setUser] = useState('');
  const [newFeedSwitch, setNewFeedSwitch] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

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

        if(user.isVerified === false)
          setIsVerified(true)

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
              <CreatePost shouldFeedChange={setNewFeedSwitch}/>
              <div className="horizontal_line"></div>
              <Feed shouldFeedChange={setNewFeedSwitch}/>
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
