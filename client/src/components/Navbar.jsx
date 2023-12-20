import React, { useState, useEffect, useContext } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import style from "../css/components/Navbar.module.css";
import { gapi } from "gapi-script";
import { useGoogleLogin } from "react-google-login";
import axios from "../config/axios.js";
import { ContextProvider } from "../config/Context";
const Navbar = () => {
  const { user, setUser } = useContext(ContextProvider);
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  // handle googe login
  const clientId = import.meta.env.VITE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onFailure = (err) => {
    alert("Faliure");
  };
  const onSuccess = async (data) => {
    const { profileObj } = data;

    const { email, name, imageUrl } = profileObj;
    try {
      const res = await axios.post("/auth", { email, name, imageUrl });
      const { accessToken, refreshToken, msg } = res.data;
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
      alert(msg);
      window.location.reload();
    } catch (error) {
      console.log("Error while", error);
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    onFailure,
  });

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const Logout = async () => {
    const res = await axios.post(
      "/user/logout",
      { refreshToken: refreshToken },
      header
    );

    window.location.reload();
    localStorage.clear();
    setUser([]);
  };
  return (
    <>
      <div className={style.navbar_container}>
        <div className={style.navbar_wrapper}>
          <NavLink to={"/"}>
            <div className={style.navbar_logo}>
              <svg width="0" height="0">
                <linearGradient
                  id="gradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop stopColor="#f96f10" offset="0%" />
                  <stop stopColor="#ef5088" offset="100%" />
                </linearGradient>
              </svg>
              <HiPaperAirplane
                className={style.navbar_icon}
                style={{ fill: "url(#gradient)" }}
              />
              <h1 className={style.navbar_title}>Apexa</h1>
            </div>
          </NavLink>
          <div className={style.btn_wrapper}>
            {accessToken ? (
              <div className={style.picCon}>
                <div onClick={Logout}>
                  <LuLogOut className={style.icn} size={22} color="white" />
                </div>
                <img className={style.profilePic} src={user?.profilePic} />
              </div>
            ) : (
              <>
                <div onClick={signIn} className={style.btn1}>
                  Sign in
                </div>
                <div className={style.btn2}>Sign up</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
