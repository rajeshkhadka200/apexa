import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularProgressBar = (props) => {
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex", color: props.color }}
    >
      <CircularProgress
        variant="indeterminate"
        {...props}
        color="inherit"
        size={40}
        thickness={4.5}
      />
      <Box
        sx={{
          top: "1px",
          left: "1px",
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          sx={{
            fontFamily: "Poppins",
          }}
        >
          {/* {`${Math.round(props.value)}%`} */}
        </Typography>
      </Box>
    </Box>
  );
};

CircularProgressBar.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default CircularProgressBar;
