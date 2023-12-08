import React from 'react'
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";


const Nav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Nav