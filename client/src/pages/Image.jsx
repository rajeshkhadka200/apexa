import React, { useRef, useState } from "react";
import styles from "../css/components/Image.module.css";
import { LuImagePlus } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineSound } from "react-icons/ai";

const Image = () => {
  const [id, setId] = useState();
  const hiddenFileInput = useRef(null);
  const [file, setfile] = useState("");
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setfile(reader.result);
      };
      reader.readAsDataURL(fileUploaded);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_header}>
          <div
            style={
              file
                ? { border: "2px solid #2d2d2d52" }
                : { border: "3px dotted #1b1b1b" }
            }
            onClick={handleClick}
            onMouseEnter={() => {
              setId("icon_active");
            }}
            onMouseLeave={() => {
              setId("");
            }}
            className={styles.herder_left}
          >
            {file ? (
              ""
            ) : (
              <LuImagePlus
                size={30}
                color={id ? "rgba(255, 255, 255, 0.792)" : "#575a60a6"}
              />
            )}
            <input
              accept="image/*"
              type="file"
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            {file && (
              <img className={styles.image_display} src={file} alt="imahe" />
            )}
          </div>
          <div className={styles.herder_right}>
            <button
              onClick={() => {
                setfile("");
              }}
            >
              Remove
            </button>
            <button>Generate</button>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      {/* sedc startsa here */}
      <div className={styles.img_body}>
        <div className={styles.body_left}>
          <div className={styles.header}>
            <h3>Image's Tittle</h3>
            <div className={styles.icon_con}>
              <div className={styles.single_icn}>
                <FaRegCopy size={15} color="#fff" />
              </div>
              <div className={styles.single_icn}>
                <AiOutlineSound size={15} color="#fff" />
              </div>
            </div>
          </div>
          <p className={styles.smallText}>
            This is the image tittle. This is the tittle yoiu can copy and paste
            this
          </p>
        </div>
        {/* <div className={styles.line_vertical}></div> */}
        <div className={styles.body_right}>
          <div className={styles.header}>
            <h3>Image's Description</h3>
            <div className={styles.icon_con}>
              <div className={styles.single_icn}>
                <FaRegCopy size={15} color="#fff" />
              </div>
              <div className={styles.single_icn}>
                <AiOutlineSound size={15} color="#fff" />
              </div>
            </div>
          </div>
          <p className={styles.smallText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odio
            suscipit incidunt, aspernatur dolorum assumenda.
          </p>
        </div>
      </div>
    </>
  );
};

export default Image;
