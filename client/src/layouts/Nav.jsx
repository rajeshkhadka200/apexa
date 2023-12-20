import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Navigate, useNavigate } from "react-router-dom";

const Nav = () => {
  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null ) {
     return navigate("/");
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
