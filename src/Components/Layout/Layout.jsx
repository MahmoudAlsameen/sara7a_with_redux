import React from 'react'
import styles from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import  {Outlet}  from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
<NavBar/>


<Outlet/>

<Footer/>
    </>
  )
}
