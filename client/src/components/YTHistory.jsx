import React from "react";
import styles from "../css/components/History.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import axios from "../config/axios.js";

const YTHistory = ({ data }) => {
  const deleteYTHistory = async (video_id) => {
    try {
      const res = await axios.delete(`/yt/${video_id}`);
      if (res.status === 200) {
        toast.success("Tracker removed for this Video");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      console.log("server err, delting video history");
    }
  };
  return (
    <>
      <div className={styles.history_con}>
        {data?.map((item, index) => {
          return (
            <div className={styles.history} key={index}>
              <NavLink
                key={index}
                to={`/app/yt/${item.details.video_id}`}
                className={styles.box}
              >
                {index + 1}.
              </NavLink>
              <NavLink
                key={index}
                to={`/app/yt/${item.details.video_id}`}
                className={styles.box}
              >
                <div className={styles.t_thumbnail}>
                  <img src={item.details.thumbnail} />
                </div>
              </NavLink>
              <NavLink
                key={index}
                to={`/app/yt/${item.details.video_id}`}
                className={styles.box}
              >
                <div className={styles.t_text}>{item.details.title}</div>
              </NavLink>
              <NavLink
                to={`/app/yt/${item.details.video_id}`}
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
                    deleteYTHistory(item.details.video_id);
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

export default YTHistory;
