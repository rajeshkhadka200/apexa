import React, { useState } from "react";
import styles from "../css/components/History.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import axios from "../config/axios.js";
import toast from "react-hot-toast";

const BlogHistory = ({ data }) => {
  const deleteBlogHistory = async (blog_url) => {
    try {
      const res = await axios.post(
        `/hashnode/deleteBlog`,
        {
          blog_url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Tracker removed for this blog"); 
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.history_con}>
        {data?.map((item, index) => {
          const blogURL = item?.details?.blog_url;
          const urlObject = new URL(blogURL);
          const slugPart = urlObject.pathname.replace(/^\/+/, "");
          return (
            <div className={styles.history} key={index}>
              <NavLink
                to={`/app/blog/${slugPart}`}
                state={{ search: blogURL }}
                className={styles.box}
              >
                {index + 1}.
              </NavLink>
              <NavLink
                to={`/app/blog/${slugPart}`}
                state={{ search: blogURL }}
                className={styles.box}
              >
                <div className={styles.t_thumbnail}>
                  <img src={item.details.thumbnail} />
                </div>
              </NavLink>
              <NavLink
                to={`/app/blog/${slugPart}`}
                state={{ search: blogURL }}
                className={styles.box}
              >
                <div className={styles.t_text}>{item.details.title}</div>
              </NavLink>
              <NavLink
                to={`/app/blog/${slugPart}`}
                state={{ search: blogURL }}
                className={styles.box}
              >
                <div
                  className={item.notif ? styles.notif_yes : styles.notif_no}
                >
                  {item.notif ? "True" : "False"}
                </div>
              </NavLink>
              <div className={styles.box}>
                <IconButton
                  onClick={() => {
                    deleteBlogHistory(item.details.blog_url);
                  }}
                  sx={{
                    color: "#d2d2d2a6",
                    backgroundColor: "#2d2d2d52",
                    "&:hover": {
                      backgroundColor: "#1e1f1f",
                      color: "#fff",
                    },
                  }}
                  size="small"
                >
                  <AiOutlineClose />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlogHistory;
