"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import Events from '../_components/Events/Events'

const EventsPage = () => {

    return (

        <LoggedInLayout>
            <Events />
        </LoggedInLayout>

    )

}

export default EventsPage