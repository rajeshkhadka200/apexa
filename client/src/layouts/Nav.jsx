import React from 'react'
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';


const Nav = () => {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <Outlet />
    </>
  )
}

export default Nav