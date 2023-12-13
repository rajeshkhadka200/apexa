import React, { useEffect } from "react";
import styles from "../css/components/Visualizer.module.css";
import SearchBox from "./SearchBox";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import { PiMagicWandFill } from "react-icons/pi";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import { Chart as ChartJS, ArcElement, Tooltip as Tip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import { TypeAnimation } from "react-type-animation";
import Skeleton from "@mui/material/Skeleton";

ChartJS.register(ArcElement, Tip, Legend);

const Visualizer = ({ search, onSearch, handleSearch, data }) => {
  const {
    type,
    comment_data,
    overall_data,
    thumbnail,
    title,
    user_img,
    user_name,
    like,
    comment,
    color,
  } = data;

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  //test loading logic [P.S. This is just for testing and will be removed later]
  useEffect(() => {
    //set the loading to false after 5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const NotifSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
  ))(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    marginRight: 10,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "100ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : color,
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 16,
      height: 16,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#f96f10",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const data1 = {
    labels: ["Appreciation", "Vulgar", "Neutral", "Hate"],
    datasets: [
      {
        label: "Percentage",
        data: [300, 50, 100, 60],
        backgroundColor: ["#f96f10", "#3093ee", "#994abe", "#00b747"],
        hoverOffset: 4,
        borderColor: "#1B1B1B",
        borderWidth: 2,
        radius: 85,
      },
    ],
  };
  const data2 = {
    labels: ["Like", "Dislike"],
    datasets: [
      {
        label: "Percentage",
        data: [80, 20],
        backgroundColor: ["#994abe", "#3093ee"],
        hoverOffset: 4,
        borderColor: "#1B1B1B",
        borderWidth: 2,
        radius: 85,
      },
    ],
  };

  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={type}
      />
      <div className={styles.visualizer_con}>
        <div className={styles.data_con}>
          <div className={styles.data_image}>{/* <img src=""/> */}</div>
          <div className={styles.data_text}>
            <div className={styles.title}>{title}</div>
            <div className={styles.user_details}>
              <div className={styles.user_img}>
                {/* <img src="" alt=""/> */}
              </div>
              <div className={styles.user_name}>{user_name}</div>
            </div>
            <div className={styles.data_btn}>
              <div className={styles.btn_left}>
                <div className={styles.like}>
                  <IconButton aria-label="like" size="small">
                    <AiFillLike color="#d2d2d2a6" />
                  </IconButton>
                  <div className={styles.number}>{like}</div>
                </div>
                <div className={styles.comment}>
                  <IconButton aria-label="comment" size="small">
                    <BiCommentDetail color="#d2d2d2a6" />
                  </IconButton>
                  <div className={styles.number}>{comment}</div>
                </div>
              </div>
              <div className={styles.btn_right}>
                <Tooltip
                  title={
                    type === "yt"
                      ? "Summarize your Youtube Video in Just one click"
                      : "Summarize your Blog in Just one click"
                  }
                  placement="bottom"
                  arrow
                >
                  <div className={styles.summarize} onClick={handleOpen}>
                    <IconButton aria-label="summarize" size="small">
                      <PiMagicWandFill color={color} />
                    </IconButton>
                    <div className={styles.right_text}>Summarize</div>
                  </div>
                </Tooltip>
                <Tooltip
                  title={"Turn On to notify about harsh comments in your email"}
                  placement="bottom"
                  arrow
                >
                  <div className={styles.notif}>
                    <FormControlLabel
                      control={<NotifSwitch />}
                      label="Notification"
                      sx={{
                        marginLeft: "10px",
                        color: "#f5f5f5",
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.analytics_con}>
          <div className={styles.a_left}>
            <Doughnut
              data={comment_data}
              options={{
                responsive: false,
                aspectRatio: 1,
                plugins: {
                  customCanvasBackgroundColor: {
                    color: "red",
                  },
                  legend: {
                    position: "right",
                    align: "center",
                    labels: {
                      font: {
                        size: 14,
                        family: "Poppins",
                      },
                    },
                  },
                },
              }}
              width={450}
              height={200}
            />
            <div className={styles.a_text1}>Comment Analysis</div>
          </div>
          <div className={styles.a_right}>
            <Doughnut
              data={overall_data}
              options={{
                responsive: false,
                aspectRatio: 1,
                plugins: {
                  customCanvasBackgroundColor: {
                    color: "red",
                  },
                  legend: {
                    position: "right",
                    align: "center",
                    labels: {
                      font: {
                        size: 14,
                        family: "Poppins",
                      },
                    },
                  },
                },
              }}
              width={450}
              height={200}
            />
            <div className={styles.a_text2}>Overall Analysis</div>
          </div>
        </div>
      </div>

      {
        //model
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Summary Model"
        aria-describedby="Show summary to the user"
      >
        <div className={styles.summary_con}>
          <div className={styles.summary_title}>
            Summary{" "}
            <span className={styles.sub_text}>
              {loading && "(Magic on the way... Just Wait)"}
            </span>
          </div>
          {loading ? (
            <>
              <div className={styles.loading_con}>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={20}
                  sx={{ bgcolor: "#2d2c2d", borderRadius: "2px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={450}
                  height={20}
                  sx={{ bgcolor: "#2d2c2d", borderRadius: "2px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={500}
                  height={20}
                  sx={{ bgcolor: "#2d2c2d", borderRadius: "2px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={20}
                  sx={{ bgcolor: "#2d2c2d", borderRadius: "2px" }}
                />
              </div>
            </>
          ) : (
            <>
              <TypeAnimation
                sequence={[
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid veniam magni, laborum, molestiae itaque necessitatibus reprehenderit non perferendis atque voluptatibus quia facere velit officiis maiores assumenda eaque quod repellendus voluptates.Ea minus corporis magnam nihil perferendis dolores, illo nesciunt distinctio vero? Numquam mollitia nihil quo dignissimos dolorum alias deleniti, modi quis accusamus. Sed optio exercitationem atque natus, error vitae excepturi",
                ]}
                wrapper="span"
                speed={80}
                style={{
                  fontSize: "1rem",
                  display: "inline-block",
                  fontWeight: "400",
                  color: "#fff",
                }}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Visualizer;
