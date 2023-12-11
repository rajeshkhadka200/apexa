import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Nav = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="layout_con">
        <div className="layout">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Nav;
