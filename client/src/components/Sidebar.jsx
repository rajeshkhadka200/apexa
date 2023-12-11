import React from "react";
import style from "../css/components/Sidebar.module.css";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbPhotoScan } from "react-icons/tb";
import { RiSeoFill } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import Link from "./Link";
const Sidebar = () => {
    const links = [
      {
        to: "/app",
        icon: <PiYoutubeLogoDuotone size={30} />,
        title: "YT-Insight",
        c: "#f96f10",
      },
      {
        to: "/app/blog",
        icon: <FaRegPenToSquare size={25} />,
        title: "Blog-Scan",
        c: "#3093ee",
      },
      {
        to: "/app/image",
        icon: <TbPhotoScan size={30} />,
        title: "Pic-Sense",
        c: "#994abe",
      },
      {
        to: "/app/seo",
        icon: <RiSeoFill size={30} />,
        title: "SEO-Analyze",
        c: "#00b747",
      },
    ];
  return (
    <>
      <div className={style.sidebar_con}>
        {links.map((link, index) => {
          return (
            <Tooltip title={link.title} placement="right" arrow key={index}>
              <Link to={link.to} icon={link.icon} style={style} c={link.c} />
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
