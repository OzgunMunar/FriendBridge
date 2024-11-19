"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import Messages from '../_components/Messages/Messages'


const MessagesPage = () => {

    return (

        <LoggedInLayout>
            <Messages />
        </LoggedInLayout>

    )

}

export default MessagesPage