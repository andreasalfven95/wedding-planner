import Navbar from './Navbar'
import React, { useState } from 'react'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
/* import Footer from './Footer' */
import Sidebar from './Sidebar'
import { GlobalStyle } from '../styles/GlobalStyles'
import Notify from './Notify'
import Modal from './Modal'

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(DataContext)
  const { users, auth, modal } = state

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <GlobalStyle />
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Notify />
      <Modal />
      <main className='cursor-default'>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
