import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";

const Nav = () => {
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (accessToken) {
      // <Navigate to="/" />;
    }
  }, []);

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
