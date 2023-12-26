import React from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import History from "../components/History";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

  const history_data = [
    {
      thumbnail: "",
      title:
        "Yt Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      notif: true,
      id: "29nm323720302",
    },
    {
      thumbnail: "",
      title:
        "Yt Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      notif: true,
      id: "29nm323720302",
    },
    {
      thumbnail: "",
      title:
        "Yt Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      notif: false,
      id: "29nm323720302",
    },
  ];

  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={"yt"}
      />
      <History data={history_data} />
    </>
  );
};

export default Dashboard;
