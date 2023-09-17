import React, { Fragment, useState, useEffect } from 'react'
import { UserContext, PageContext } from '../Contexts/Contexts'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import '@/app/_styles/mainpage.css'

const LoggedInLayout = ( {children} ) => {

    const [user, setUser] = useState('')
    const [page, setPage] = useState('Feed')
    
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

      fetchUserData()

    },[])

    return (
      <Fragment>
        <UserContext.Provider value = {{ user }}>
          <Navbar/>
          <PageContext.Provider value = {{ setPage }}>
            <LeftSideBar page={page}/>
            {children}
          </PageContext.Provider>
        </UserContext.Provider>
      </Fragment>
    )
}

export default LoggedInLayout