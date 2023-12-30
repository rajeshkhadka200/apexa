import React, { useState } from "react";
import styles from "../css/components/Image.module.css";
import { RiAiGenerate } from "react-icons/ri";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "../config/axios.js";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const Image = () => {
  const SearchButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    height: "50px",
    backgroundColor: "#050505",
    border: "2px solid #2d2d2d52",
    borderRadius: "0px 10px 10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    color: "#575a60a6",
    "&:hover": {
      backgroundColor: "rgba(39, 39, 39, 0.2)",
      boxShadow: "none",
    },
  });
  const [search, setSearch] = useState("");

  const [generatedImg, setGeneratedImg] = useState();
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      if (search === "") {
        toast.error("Please write some prompt");
        return;
      }
      setLoading(true);
      setGeneratedImg("");
      const res = await axios.post(
        `/image`,
        {
          user_input: search,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setGeneratedImg(res.data);
      setLoading(false);
      toast.success("Apexa generated your image. 👏");
    } catch (error) {
      toast.error("We are unable to generate your image");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input
            style={{
              cursor: loading === true && "not-allowed",
            }}
            type="text"
            disabled={loading === true ? true : false}
            placeholder="Enter the image description"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <SearchButton
            component="label"
            variant="contained"
            onClick={generateImage}
            sx={{
              //chnage the cursor to disable
              cursor: loading === true && "not-allowed",
              "&:hover": {
                backgroundColor:
                  search === "" ? "#050505" : "rgba(39, 39, 39, 0.2)",
              },
            }}
          >
            <RiAiGenerate />
          </SearchButton>
        </div>
        {loading && <CircularProgress size={25} color="secondary" />}
        {generatedImg && (
          <>
            <div className={styles.imgBox}>
              <img src={generatedImg.imgUrl} alt="image" />
            </div>
            <div className={styles.btnContainer}>
              <a href={generatedImg.imgUrl} target="_blank" download>
                <button className={styles.download}>Download</button>
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Image;
