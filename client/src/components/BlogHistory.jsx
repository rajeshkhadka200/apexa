import React from "react";
import styles from "../css/components/History.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

const BlogHistory = ({ data }) => {
  return (
    <>
      <div className={styles.history_con}>
        {data?.map((item, index) => {
          const blogURL = item?.details?.blog_url;
          console.log(blogURL);
          const urlObject = new URL(blogURL);
          const slugPart = urlObject.pathname.replace(/^\/+/, "");
          console.log(blogURL);
          return (
            <NavLink
              key={index}
              to={`/app/blog/${slugPart}`}
              state={{ search: blogURL }}
            >
              <div className={styles.history} key={index}>
                <div className={styles.box}>{index + 1}.</div>
                <div className={styles.box}>
                  <div className={styles.t_thumbnail}>
                    <img src={item.details.thumbnail} />
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.t_text}>{item.details.title}</div>
                </div>
                <div className={styles.box}>
                  <div
                    className={item.notif ? styles.notif_yes : styles.notif_no}
                  >
                    {item.notif ? "True" : "False"}
                  </div>
                </div>
                <div className={styles.box}>
                  <IconButton
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
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default BlogHistory;
