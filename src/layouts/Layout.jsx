import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer/>
    </>
  )
}

export default Layout