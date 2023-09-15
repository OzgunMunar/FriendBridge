import './globals.css'
import { Inter } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from './_components/Navbar/Navbar';

config.autoAddCss = false; 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Social Media App',
  description: 'Written by Ozgun Munar',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <div className="icons_by_who">
          All the icons by <a href="https://icons8.com">Icons8</a>
        </div>

      </body>
    </html>
  )
}
