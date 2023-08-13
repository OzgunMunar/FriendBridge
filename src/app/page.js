'use client'

import { useEffect, useState } from "react";
import LeftSideBar from "./_components/LeftSideBar";
import Navbar from "./_components/Navbar";
import axios from "axios";

export default function Home() {

  const [userName, setUserName] = useState('');

  useEffect(() => {

    const fetchData = async() => {

      try {
      
        const loggedUser = await axios.get('api/users/me')
        const user = loggedUser.data.data

        setUserName(user.username)
  
      } catch (error) {
        console.log(error)
      }

    }

    fetchData();

  },[])

  return (
    <main>
      <Navbar username={userName}/>
      <LeftSideBar username={userName}/>
    </main>
  )
}
