"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import ReadNews from '../_components/ReadNews/ReadNews'

const ReadNewsPage = () => {

    return (

        <LoggedInLayout>
            <ReadNews />
        </LoggedInLayout>

    )

}

export default ReadNewsPage