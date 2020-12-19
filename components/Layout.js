import Navbar from './Navbar'
import React, { useState } from 'react'
/* import Footer from './Footer' */
import Sidebar from './Sidebar'
import { GlobalStyle } from '../styles/GlobalStyles'
import Notify from './Notify'

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <GlobalStyle />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Notify />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
