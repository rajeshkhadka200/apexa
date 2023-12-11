import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Link = ({ icon, to, style, c,title }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Tooltip title={title} placement="right" arrow>
        <div className={style.sidebar_link}>
          <NavLink
            to={to}
            className={pathname === to ? style.active : style.normal}
            style={{ color: pathname === to ? c : "#575a60a6" }}
          >
            {icon}
          </NavLink>
        </div>
      </Tooltip>
    </>
  );
};

export default Link;
