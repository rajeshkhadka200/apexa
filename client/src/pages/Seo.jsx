import React, { useState } from "react";
import styles from "../css/components/Seo.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const Seo = () => {
  const [hashtag, sethashTag] = useState("technology");
  const [desc, setDesc] = useState();

  const handleChange = (event) => {
    sethashTag(event.target.value);
  };

  const processUserPref = async () => {
    if (hashtag === "" || desc === "") {
      return toast.error("Please add hashtag and description");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <Select
                  labelId="select_box"
                  id="demo-simple-select"
                  value={hashtag}
                  onChange={handleChange}
                  sx={{
                    fontWeight: "200",
                    fontFamily: " Poppins, sans-serif",
                    borderRadius: "7px",
                    background: "#050505",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                    height: "50px",
                    color: "#d2d2d2a6",
                    outline: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #2d2d2d52",
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #2d2d2d52",
                      },
                    },
                  }}
                >
                  <MenuItem value={"technology"}>Technology</MenuItem>
                  <MenuItem value={"gaming"}>Gaming</MenuItem>
                  <MenuItem value={"health"}>Health</MenuItem>
                  <MenuItem value={"education"}>Education</MenuItem>
                  <MenuItem value={"food"}>Sports</MenuItem>
                  <MenuItem value={"food"}>Food</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className={styles.middle}>
            <input
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              type="text"
              placeholder="Give some description "
            />
          </div>
          <div className={styles.right}>
            <button onClick={processUserPref}>Process</button>
          </div>
        </div>
      </div>
      <div className={styles.lower_box}>
        <div className={styles.content_box}>
          <span className={styles.span}></span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
          ratione iste facere minima, aliquid obcaecati velit perspiciatis odio?
          Est Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          obcaecati amet autem officia, perspiciatis expedita repellat maxime
          soluta voluptates inventore dolorum, placeat reprehenderit culpa
          dignissimos odit, ratione ipsum v
          <div className={styles.speak_btn}>
            <HiOutlineSpeakerWave />
          </div>
        </div>
        <div className={styles.content_box}>
          <span className={styles.span}></span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
          ratione iste facere minima, aliquid obcaecati velit perspiciatis odio?
          Est Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          obcaecati amet autem officia, perspiciatis expedita repellat maxime
          soluta voluptates inventore dolorum, placeat reprehenderit culpa
          dignissimos odit, ratione ipsum v
          <div className={styles.speak_btn}>
            <HiOutlineSpeakerWave />
          </div>
        </div>
      </div>
    </>
  );
};

export default Seo;
