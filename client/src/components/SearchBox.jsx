import React from "react";
import styles from "../css/components/SearchBox.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BsSearch } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { RiAiGenerate } from "react-icons/ri";

const SearchBox = ({ search, onSearch, handleSearch, type }) => {
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

  return (
    <>
      <div className={styles.search_con}>
        <TextField
          placeholder={
            type === "blog"
              ? "Please enter Blog URL"
              : type === "image"
              ? "Please enter Image details"
              : type === "yt"
              ? "Please enter Youtube Video URL"
              : ""
          }
          variant="outlined"
          type="search"
          value={search}
          onChange={(e) => handleSearch(e)}
          disabled={type === "detail" ? true : false}
          hiddenLabel
          sx={{
            input: {
              fontFamily: " Poppins, sans-serif",
              fontWeight: "200",
            },
            height: "50px",
            width: "80%",
            backgroundColor: "#050505",
            border: "2px solid #2d2d2d52",
            borderRadius: "10px 0px 0px 10px",
            cursor: type === "detail" && "not-allowed",
            "& .MuiInputBase-input": {
              color: "#d2d2d2a6",
              fontSize: "17px",
              padding: "11px 15px",
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
            //change the input font color when input is disabled
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#575a60a6",
            },
          }}
        />
        <SearchButton
          component="label"
          variant="contained"
          onClick={onSearch}
          sx={{
            //chnage the cursor to disable
            cursor: type === "detail" && "not-allowed",
            "&:hover": {
              backgroundColor:
                search === "" ? "#050505" : "rgba(39, 39, 39, 0.2)",
            },
          }}
        >
          {type === "blog" ? (
            <BsSearch />
          ) : type === "image" ? (
            <RiAiGenerate />
          ) : type === "yt" ? (
            <BsSearch />
          ) : (
            ""
          )}
        </SearchButton>
      </div>
    </>
  );
};

export default SearchBox;
