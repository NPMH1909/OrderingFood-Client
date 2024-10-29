import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <NavbarComponent/>
        <Outlet />
        <FooterComponent/>
    </>
  )
}

export default Layout