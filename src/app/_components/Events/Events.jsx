import React from 'react'
import Event from './Event'

const Events = () => {

    return(
        
        <div className='body_sections'>

            <div className='left_sidebar_emptiness' />

            <div className='events_section'>

                <div className='w-full border-t border-t-2 border-t-orange-700 bg-white flex items-center justify-center gap-2 text-xl py-2'>
                    <img width="25" height="25" src="https://img.icons8.com/color/48/calendar--v1.png" alt="bookmark-ribbon--v1"/>
                    <span>Upcoming Events</span>
                </div>

                <Event />

            </div>

            <div className='right_sidebar_emptiness'/>

        </div>

    )

}

export default Events