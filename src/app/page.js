'use client'

import { React} from "react";
import LoggedInLayout from "./_components/LoggedInLayout";
import Main from "./_components/Main";

export default function Home() {

  return (
    <main>
      <LoggedInLayout>

        <Main />

      </LoggedInLayout>
    </main>
  )
}