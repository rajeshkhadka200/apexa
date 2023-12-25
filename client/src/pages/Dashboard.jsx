import React from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import History from "../components/History";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = () => {
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
