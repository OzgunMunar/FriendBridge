import React, { Fragment, useContext, useEffect, useState } from 'react'
import CreatePost from '../Post/CreatePost';
import Feed from '../Feed/Feed';
import axios from 'axios';
import { PageLoaderContext } from "../Contexts/Contexts";
import MainRightSide from '../MainRightSide/MainRightSide';
import { toast } from "react-toastify";
import { FeedProvider } from '../Contexts/FeedContext';
import { useUserContext } from '../Contexts/UserContext';
import '@/app/_styles/mainpage.css'
import { feedTypes } from '../FeedEnum/FeedEnum';

const Main = () => {

    const { user } = useUserContext()
    const { setLoader } = useContext(PageLoaderContext)

    const [isVerified, setIsVerified] = useState(true)

    const logout = async () => {

        try {

            await axios.get('/api/users/logout')
            localStorage.removeItem("userData")
            toast.success('Logout successful.', { theme: "light" })
            router.push('/login')

        } catch (error) {
            toast.error(error.message, { theme: "dark" })
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

                <FeedProvider>
                    <CreatePost postType={'FeedPost'} />
                    <Feed feedType={feedTypes.MainFeed} userId={user._id} />
                    <MainRightSide />
                </FeedProvider>

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