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
    // const [userInfoRefreshSwitch, setUserInfoRefreshSwitch] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {

      const fetchUserData = async() => {

        try {
        
          const loggedUser = await axios.get('api/users/loggedinuser')
          const user = loggedUser.data.data
        
          setUser(user)
        
        } catch (error) {
          console.log(error)
        }

      }

      fetchUserData()

    }, [])

    useEffect(() => {

      setLoader(false)

    },[])

    return loader ? 
      <Fragment>
        {/* setUserInfoRefreshSwitch */}
        <UserContext.Provider value = {{user, setUser}}>
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
        {/* setUserInfoRefreshSwitch */}
        <UserContext.Provider value = {{user, setUser}}> 
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