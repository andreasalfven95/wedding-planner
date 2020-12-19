import React, { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import { menuData } from '../data/MenuData'
import { Button } from './Button'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'

const Navbar = ({ toggle }) => {
  /* const router = useRouter() */
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
  }

  const loggedRouter = () => {
    return (
      <NavBtn>
        <Link href='/profile' passHref>
          <Button
            primary='true'
            round='true'
            style={{
              marginRight: '1rem',
            }}
          >
            <img
              src={auth.user.avatar}
              alt='auth.user.avatar'
              style={{
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                marginRight: '10px',
              }}
            />
            {auth.user.name}
          </Button>
        </Link>
        <Button
          primary='true'
          round='true'
          style={{
            marginRight: '1rem',
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </NavBtn>
    )
  }

  return (
    <Nav>
      <Link href='/' passHref>
        <NavLink
          css={`
            font-size: 1.5rem;

            &:hover {
              color: #000;
            }
          `}
        >
          WedPlan
        </NavLink>
      </Link>
      <Bars onClick={toggle} />
      <NavMenu>
        {menuData.map((item, index) => (
          <Link href={item.link} passHref key={index}>
            <NavLink>{item.title}</NavLink>
          </Link>
        ))}
      </NavMenu>

      {Object.keys(auth).length === 0 ? (
        <NavBtn>
          <Link href='/signin' passHref>
            <Button
              primary='true'
              round='true'
              style={{
                marginRight: '1rem',
              }}
            >
              Sign In
            </Button>
          </Link>
          <Link href='/register' passHref>
            <Button
              primary='true'
              round='true'
              style={{
                marginRight: '1rem',
              }}
            >
              Register
            </Button>
          </Link>
        </NavBtn>
      ) : (
        loggedRouter()
      )}
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1300px) / 2);
  z-index: 100;
  position: relative;
`

const NavLink = styled.a`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none !important;

  &:hover {
    color: #f26a2e;
  }
`
const Bars = styled(FaBars)`
  display: none;
  color: #000;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: -48px; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
