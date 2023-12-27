import React, { useContext, useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { ContextProvider } from "../config/Context.jsx";
import YTHistory from "../components/YTHistory.jsx";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { user } = useContext(ContextProvider);

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
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(`user/getytHistory/${user_id}`);
        setYtHistory(res.data.history);
      } catch (error) {
        console.log("Error fetching data");
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
      <YTHistory data={ytHisory} />
    </>
  );
};

export default Dashboard;
