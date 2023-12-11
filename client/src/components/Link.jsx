import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Link = ({ icon, to, style, c }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className={style.sidebar_link}>
        <NavLink
          to={to}
          className={pathname === to ? style.active : style.normal}
          style={{ color: pathname === to ? c : "#575a60a6" }}
        >
          {icon}
        </NavLink>
      </div>
    </>
  );
};

export default Link;
