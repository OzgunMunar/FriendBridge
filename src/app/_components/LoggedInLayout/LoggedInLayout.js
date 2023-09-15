import React, { Fragment, useState, useEffect } from 'react'
import { UserContext } from '../Contexts/Contexts'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import '@/app/_styles/mainpage.css'

const LoggedInLayout = ( {children} ) => {

    const [user, setUser] = useState('')
    
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
        <Fragment>
            <UserContext.Provider value = {{ user }}>
                <Navbar/>
                <LeftSideBar/>
                {children}
            </UserContext.Provider>
        </Fragment>
    )
}

export default LoggedInLayout