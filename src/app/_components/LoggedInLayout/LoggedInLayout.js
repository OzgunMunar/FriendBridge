import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { UserContext, PageContext, PageLoaderContext } from '../Contexts/Contexts'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import '@/app/_styles/mainpage.css'
import PageLoader from '@/app/pageloader'

const LoggedInLayout = ( {children} ) => {

    const [user, setUser] = useState('')
    const [page, setPage] = useState('Feed')
    const [userInfoRefreshSwitch, setUserInfoRefreshSwitch] = useState(false)
    const [loader, setLoader] = useState(true)

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

    }, [userInfoRefreshSwitch])

    useLayoutEffect(() => {

      setLoader(true)

    }, [])

    useEffect(() => {

      setLoader(false)

    },[])

    return loader ? 
      <Fragment>
        <UserContext.Provider value = {{user, setUserInfoRefreshSwitch}}>
          <Navbar/>
          <PageContext.Provider value = {{ setPage }}>
            <LeftSideBar page = { page }/>
            <PageLoader />
          </PageContext.Provider>
        </UserContext.Provider>
      </Fragment>
      : 
      (
      <Fragment>
        <UserContext.Provider value = {{user, setUserInfoRefreshSwitch}}>
          <Navbar/>
          <PageContext.Provider value = {{ setPage }}>
            <LeftSideBar page={page}/>
            <PageLoaderContext.Provider value = {{ setLoader }}>
              { children }
            </PageLoaderContext.Provider>
          </PageContext.Provider>
        </UserContext.Provider>
      </Fragment>
    )
}

export default LoggedInLayout