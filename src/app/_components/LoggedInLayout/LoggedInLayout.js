import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { UserContext, PageContext, PageLoaderContext } from '../Contexts/Contexts'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import '@/app/_styles/mainpage.css'
import PageLoader from '@/app/pageloader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoggedInLayout = ( {children} ) => {

    const [user, setUser] = useState('')
    const [page, setPage] = useState('Feed')
    const [userInfoRefreshSwitch, setUserInfoRefreshSwitch] = useState(false)
    const [loader, setLoader] = useState(true)
    
    const malePlaceholderImage = "https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
    const femalePlaceholderImage = "https://media.istockphoto.com/id/2060009001/tr/vektör/avatar-user-profile-person-icon-profile-picture-for-social-media-profiles-icons-screensavers.jpg?s=2048x2048&w=is&k=20&c=OCWYH0zjMy_j_lurN7s0bioBWgnD0NCifQmnjp90yuI="

    useEffect(() => {

      const fetchUserData = async() => {

        try {
        
          const loggedUser = await axios.get('api/users/me')
          const user = loggedUser.data.data
          
          if (!user.userImageLink) {
            if (user.gender === "Male") {
              user.userImageLink = malePlaceholderImage
            } else if (user.gender === "Female") {
              user.userImageLink = femalePlaceholderImage
            } 
        }
        
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
            <LeftSideBar page= { page }/>
            <PageLoader />
          </PageContext.Provider>
        </UserContext.Provider>
        <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
      </Fragment>
      : 
      (
      <Fragment>
        <UserContext.Provider value = {{user, setUserInfoRefreshSwitch}}>
          <Navbar/>
          <PageContext.Provider value = {{ setPage }}>
            <LeftSideBar page={page} />
            <PageLoaderContext.Provider value = {{ setLoader }}>
              { children }
            </PageLoaderContext.Provider>
          </PageContext.Provider>
        </UserContext.Provider>
        <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
      </Fragment>
    )
}

export default LoggedInLayout