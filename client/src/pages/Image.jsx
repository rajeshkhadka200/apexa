import React, { useState } from "react";
import styles from "../css/components/Image.module.css";
import { RiAiGenerate } from "react-icons/ri";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

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
  const [search, setSearch] = useState();

  const [generatedImg, setGeneratedImg] = useState({
    status: true,
    id: 56213512,
    imgUrl:
      "https://cdn.pixabay.com/photo/2023/10/24/16/19/evening-sky-8338559_1280.jpg",
  });

  const generateImage = async () => {};

  const resetImage = async () => {
    setGeneratedImg({
      status: false,
      id: "",
      imgUrl: "",
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Enter the image description" />
          <SearchButton
            component="label"
            variant="contained"
            onClick={generateImage}
            sx={{
              //chnage the cursor to disable
              // cursor: type === "detail" && "not-allowed",
              "&:hover": {
                backgroundColor:
                  search === "" ? "#050505" : "rgba(39, 39, 39, 0.2)",
              },
            }}
          >
            <RiAiGenerate />
          </SearchButton>
        </div>
        {generatedImg.status === true && (
          <>
            <div className={styles.imgBox}>
              <img src={generatedImg.imgUrl} alt="image" />
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.download}>Download</button>
              <button onClick={resetImage} className={styles.reset}>
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Image;
