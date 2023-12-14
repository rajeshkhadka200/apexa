import React, { useState } from "react";
import styles from "../css/components/Seo.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
const Seo = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">
                  Choose Tag
                </InputLabel> */}
                <Select
                  labelId="select_box"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  sx={{
                    height: "3.5rem",
                    color: "#f5f5f5",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #2d2d2d52",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "pink",
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #2d2d2d52",
                      },
                    },
                  }}
                  defaultValue={"hello"}
                >
                  <MenuItem selected value={10}>
                    Technology
                  </MenuItem>
                  <MenuItem value={20}>Tastag</MenuItem>
                  <MenuItem value={30}>this </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className={styles.middle}>
            <Box
              component="form"
              sx={{
                color: "#f5f5f5",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #2d2d2d52",
                },
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #2d2d2d52",
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{
                  input: {
                    color: "#f5f5f5",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "200",
                  },
                }}
                id="full-width-text-field"
                variant="outlined"
                fullWidth
                placeholder="Description about your interest"
              />
            </Box>
          </div>
          <div className={styles.right}>
            <button>Process</button>
          </div>
        </div>
      </div>
      <div className={styles.lower_box}>
        <div className={styles.indi_box}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          perferendis laborum eveniet dicta laudantium fugit eum, sit, ad eius
          suscipit adipisci dolore voluptas totam quis officiis voluptatibus,
          aut nisi quasi?
        </div>
        <div className={styles.indi_box}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          perferendis laborum eveniet dicta laudantium fugit eum, sit, ad eius
          suscipit adipisci dolore voluptas totam quis officiis voluptatibus,
          aut nisi quasi?
        </div>
      </div>
    </>
  );
};

export default Seo;
