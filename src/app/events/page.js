"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import Events from '../_components/Events/Events'
import MainRightSide from '../_components/MainRightSide/MainRightSide'

const EventsPage = () => {

    return (

        <LoggedInLayout>
            <Events />
            <MainRightSide />
        </LoggedInLayout>

    )

}

export default EventsPage