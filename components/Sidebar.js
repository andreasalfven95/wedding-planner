import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { menuData } from '../data/MenuData'
import { Button } from './Button'

function Sidebar({ isOpen, toggle }) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <NavMenu>
        {menuData.map((item, index) => (
          <Link href={item.link} passHref key={index}>
            <NavLink>{item.title}</NavLink>
          </Link>
        ))}
      </NavMenu>
      <NavBtn>
        <Link href='/signin' passHref>
          <Button primary='true' round='true'>
            Sign In
          </Button>
        </Link>
        <Link href='/register' passHref>
          <Button primary='true' round='true'>
            Register
          </Button>
        </Link>
      </NavBtn>
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`

const CloseIcon = styled(FaTimes)`
  color: #000;
`
const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`

const NavMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 80px);
  text-align: center;
`

const NavLink = styled.a`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none !important;

  &:hover {
    color: #f26a2e;
  }
`
const NavBtn = styled.div`
  display: flex;
  justify-content: center;
  /* display: grid;
  grid-template-columns: 1fr;
  text-align: center; */
`
