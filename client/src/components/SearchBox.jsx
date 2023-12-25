import React from "react";
import styles from "../css/components/SearchBox.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BsSearch } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

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
            type === "yt" ? "Enter Youtube Video URL" : "Enter Blog URL"
          }
          variant="outlined"
          type="search"
          value={search}
          onChange={(e) => handleSearch(e)}
          hiddenLabel
          sx={{
            height: "50px",
            width: "80%",
            backgroundColor: "#050505",
            border: "2px solid #2d2d2d52",
            borderRadius: "10px 0px 0px 10px",
            "& .MuiInputBase-input": {
              color: "#575a60a6",
              fontSize: "17px",
              padding: "11px 15px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
          }}
        />
        <NavLink to="/app/yt/hejwuhwehiwh">
          <SearchButton
            component="label"
            variant="contained"
            onClick={onSearch}
          >
            <BsSearch />
          </SearchButton>
        </NavLink>
      </div>
    </>
  );
};

export default SearchBox;
