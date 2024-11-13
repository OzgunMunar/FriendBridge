import React, { Fragment, useState, useEffect } from 'react'
import { PageLoaderContext } from '../Contexts/Contexts'
import Navbar from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import PageLoader from '@/app/pageloader'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '../Contexts/UserContext'
import '@/app/_styles/mainpage.css'
import 'react-toastify/dist/ReactToastify.css';

const LoggedInLayout = ( {children} ) => {

    const [loader, setLoader] = useState(true)

    useEffect(() => {

      setLoader(false)

    },[])

    return loader ? 
      <Fragment>
        <UserProvider>
          <Navbar/>
          <LeftSideBar />
          <PageLoader />
        </UserProvider>
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
        <UserProvider> 
          <Navbar/>
          <LeftSideBar />
          <PageLoaderContext.Provider value = {{ setLoader }}>
            { children }
          </PageLoaderContext.Provider>
        </UserProvider>
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