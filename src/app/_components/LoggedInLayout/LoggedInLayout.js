import React, { Fragment, useState, useEffect } from 'react'
import { UserContext, PageLoaderContext } from '../Contexts/Contexts'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import '@/app/_styles/mainpage.css'
import PageLoader from '@/app/pageloader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoggedInLayout = ( {children} ) => {

    const [user, setUser] = useState('')
    const [userInfoRefreshSwitch, setUserInfoRefreshSwitch] = useState(false)
    const [loader, setLoader] = useState(true)
    
    const malePlaceholderImage = "https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
    const femalePlaceholderImage = "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg"

    useEffect(() => {

      const fetchUserData = async() => {

        try {
        
          const loggedUser = await axios.get('api/users/loggedinuser')
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

    useEffect(() => {

      setLoader(false)

    },[])

    return loader ? 
      <Fragment>
        <UserContext.Provider value = {{user, setUserInfoRefreshSwitch}}>
          <Navbar/>
          <LeftSideBar />
          <PageLoader />
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
          <LeftSideBar />
          <PageLoaderContext.Provider value = {{ setLoader }}>
            { children }
          </PageLoaderContext.Provider>
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