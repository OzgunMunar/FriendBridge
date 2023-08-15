'use client'

import { useEffect, useState } from "react";
import LeftSideBar from "./_components/LeftSideBar";
import Navbar from "./_components/Navbar";
import axios from "axios";
import CreatePost from "./_components/CreatePost";
import '@/app/_styles/mainpage.css'
import Feed from "./_components/Feed";

export default function Home() {

  const [userName, setUserName] = useState('');
  const [newRecordSwitch, setNewRecordSwitch] = useState(false)

  useEffect(() => {

    const fetchUserData = async() => {

      try {
      
        const loggedUser = await axios.get('api/users/me')
        const user = loggedUser.data.data

        setUserName(user.username)
  
      } catch (error) {
        console.log(error)
      }

    }

    fetchUserData();

  },[])

  return (
    <main>
      <Navbar username={userName}/>
      <div className='body_sections'>

        <LeftSideBar username={userName}/>
        <div className='posts_section'>
          <CreatePost isRecordCreated={setNewRecordSwitch}/>
          <div className="horizontal_line"></div>
          <Feed isRecordCreated={newRecordSwitch}/>
        </div>
        
      </div>
      
    </main>
  )
}
