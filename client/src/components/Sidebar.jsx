import React from "react";
import style from "../css/components/Sidebar.module.css";
import { PiYoutubeLogoDuotone } from "react-icons/pi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbPhotoScan } from "react-icons/tb";

import { MdContentPasteSearch } from "react-icons/md";
import Link from "./Link";
const Sidebar = () => {
  const links = [
    {
      to: "/app/yt",
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
      icon: <MdContentPasteSearch size={30} />,
      title: "Content Predictor",
      c: "#00b747",
    },
  ];
  return (
    <>
      <div className={style.sidebar_con}>
        {links.map((link, index) => {
          return (
            <Link
              to={link.to}
              icon={link.icon}
              style={style}
              c={link.c}
              title={link.title}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
