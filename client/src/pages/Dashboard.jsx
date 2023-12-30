import React, { useContext, useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import YTHistory from "../components/YTHistory.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { MdOutlineBrowserNotSupported } from "react-icons/md";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = () => {
    if (search === "") {
      alert("Please enter a youtube link");
      return;
    }
    let youtubePattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (!youtubePattern.test(search)) {
      alert("Please enter a valid youtube url");
      return;
    }

    //get video id from url
    let video_id = search.split("v=")[1];
    if (video_id === undefined) {
      video_id = search.split("youtu.be/")[1];
    }

    navigate(`/app/yt/${video_id}`);
  };

  //  request for the history performed by loged in user
  const [ytHisory, setYtHistory] = useState();
  const user_id = localStorage.getItem("user_id");
  const [isEmpty, setisEmpty] = useState();
  useEffect(() => {
    setLoading(true);
    const getHistory = async () => {
      try {
        const res = await axios.get(`user/getytHistory/${user_id}`);
        if (res.status === 200) {
          setYtHistory(res.data.history);
        }
        if (res.status === 204) {
          setisEmpty(true);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Unable to get the tracked videos.");
      }
    };
    getHistory();
  }, []);

  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={"yt"}
      />
      {loading ? (
        <div
          style={{
            height: "calc(450px - 100px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={30} color="primary" />
        </div>
      ) : isEmpty ? (
        <div
          style={{
            color: "#d2d2d2a6",
            height: "calc(450px - 100px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <MdOutlineBrowserNotSupported color="grey" size={35} />
          <span
            style={{
              maxWidth: "250px",
              textAlign: "center",
            }}
          >
            You havent tracked any youtube comments previously.
          </span>
        </div>
      ) : (
        <YTHistory data={ytHisory} />
      )}
    </>
  );
};

export default Dashboard;
