import React, { Fragment, useContext, useEffect, useState } from 'react'
import CreatePost from '../Post/CreatePost';
import Feed from '../Feed/Feed';
import axios from 'axios';
import { UserContext, FeedChangeContext, PageLoaderContext } from "../Contexts/Contexts";
import '@/app/_styles/mainpage.css'

const Main = () => {

    const { user } = useContext(UserContext)
    const { setLoader } = useContext(PageLoaderContext)

    const [isVerified, setIsVerified] = useState(true)
    const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)

    const logout = async () => {

        try {

            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

    }

    useEffect(() => {

      user.isVerified === false && setIsVerified(false)

    }, [user])

    useEffect(() => {

      setLoader(false)

    }, [])

    return (    
      <Fragment>
        {(isVerified === true) ? 
          (
            <div className='body_sections'>
              <div className='left_sidebar_emptiness'></div>
              <div className='posts_section'>

                <FeedChangeContext.Provider value={{ shouldFeedChange, setShouldFeedChangeSwitch }}>
                  <CreatePost />
                  <Feed />
                </FeedChangeContext.Provider>

              </div>
              <div className='right_sidebar_emptiness'></div>    
            </div>
          )
          :(
            <main className="verification_warning_text">
              <p>Please verify your account by using verification mail you got. Thank you.</p>
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white
                            font-bold py-2 px-4  mt-4">
              LogOut
              </button>
            </main>
        )}

      </Fragment>
    )
}

export default Main