import React, { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import style from "../css/components/Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
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
            <div className={style.btn1}>Sign in</div>
            <div className={style.btn2}>Sign up</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
