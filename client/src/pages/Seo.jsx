import React, { useState } from "react";
import styles from "../css/components/Seo.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CiVideoOn } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { PiArticle } from "react-icons/pi";
import { MdPostAdd } from "react-icons/md";
import axios from "../config/axios.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useSpeechSynthesis } from "react-speech-kit";

const Seo = () => {
  const [hashtag, sethashTag] = useState("technology");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const handleChange = (event) => {
    sethashTag(event.target.value);
  };

  const processUserPref = async () => {
    if (hashtag === "" || desc === "") {
      return toast.error("Please add hashtag and description");
    }
    try {
      setLoading(true);
      const res = await axios.get(`/content/${hashtag}/${desc}`);
      if (res.status === 200) {
        toast.success("Apexa recommended the content ✅");
        setLoading(false);
        setData(res.data.content);
      }
      if (res.status === 204) {
        toast.error("Cnanot recommand conteent with provided information.");
        setLoading(false);
      }
    } catch (error) {
      setData();
      setLoading(false);
      toast.error("Apexa could not recommended the content");
    }
  };
  const [value, setValue] = useState("Hello please suggest the following.");
  const { speak } = useSpeechSynthesis();
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
            <button
              style={{
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading ? true : false}
              onClick={processUserPref}
            >
              Process
            </button>
          </div>
        </div>
      </div>
      <div className={styles.lower_box}>
        {loading ? (
          <div
            style={{
              marginTop: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              flexDirection: "column",
            }}
          >
            <CircularProgress
              size={30}
              sx={{
                color: "#00b747",
              }}
            />
            <p>Recomanding ...</p>
          </div>
        ) : (
          data?.map((item, index) => {
            return (
              <>
                <div className={styles.content_box}>
                  <span className={styles.span}></span>
                  <div className={styles.content_type_icon}>
                    {item.content_type === "video" ? (
                      <CiVideoOn />
                    ) : item.content_type === "reels" ? (
                      <SiYoutubeshorts />
                    ) : item.content_type === "blog" ? (
                      <PiArticle />
                    ) : item.content_type === "social media post" ? (
                      <MdPostAdd />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.title}>
                    <span>{item.content_type}</span> : {item.title}
                  </div>
                  <div className={styles.description}>{item.description}</div>
                  <div
                    onClick={() =>
                      speak({
                        text: item.description,
                      })
                    }
                    className={styles.speak_btn}
                  >
                    <HiOutlineSpeakerWave />
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default Seo;
