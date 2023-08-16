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
  const [newRecordSwitch, setNewRecordSwitch] = useState(false)

  useEffect(() => {

    const fetchUserData = async() => {

      try {
      
        const loggedUser = await axios.get('api/users/me')
        const user = loggedUser.data.data

        setUser(user)
  
      } catch (error) {
        console.log(error)
      }

    }

    fetchUserData();

  },[])

  return (
    <main>
      <UserContext.Provider value={{ user }}>
        <Navbar/>
        <div className='body_sections'>

          <LeftSideBar/>
          <div className='posts_section'>
            <div className='post_elements'>
              <CreatePost isRecordCreated={setNewRecordSwitch}/>
              <div className="horizontal_line"></div>
              <Feed isRecordCreated={newRecordSwitch}/>
            </div>
          </div>

        </div>
      </UserContext.Provider>
    </main>
  )
}
