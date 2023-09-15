'use client'

import { React} from "react";
import LoggedInLayout from "./_components/LoggedInLayout/LoggedInLayout";
import Main from "./_components/MainAfterLogIn/Main";

export default function Home() {

  return (
    <main>
      <LoggedInLayout>

        <Main />

      </LoggedInLayout>
    </main>
  )
}