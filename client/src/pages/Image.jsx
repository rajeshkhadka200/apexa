import React, { useState } from "react";
import styles from "../css/components/Image.module.css";
import SearchBox from "../components/SearchBox.jsx";
import { CiImageOn } from "react-icons/ci";

const Image = () => {
  const [generatedImg, setGeneratedImg] = useState({
    status: false,
    id: 56213512,
    imgUrl:
      "https://cdn.pixabay.com/photo/2016/12/03/15/44/fireworks-1880045_1280.jpg",
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.serchHead}>
          <SearchBox type="image" />
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgBox}>
            {generatedImg.status === true && (
              <img
                src={generatedImg.imgUrl}
                alt="ai generated image or thumbnail"
              />
            )}
            <p>Image will appeae here soon 😊</p>
            <CiImageOn color="#d2d2d2a6" size={35} />
          </div>
          {generatedImg.status === true && <button>Download</button>}
        </div>
      </div>
    </>
  );
};

export default Image;
