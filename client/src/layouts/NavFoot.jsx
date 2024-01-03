import React, { useContext,useEffect } from "react";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NavFoot = () => {

  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      return navigate("/app/yt");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavFoot;
