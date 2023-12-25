import React from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import History from "../components/History";

const Blog = () => {
  const [search, setSearch] = React.useState("");
  const onSearch = () => {};
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

   const history_data = [
     {
       thumbnail: "",
       title:
         "Blog Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
       notif: true,
       id: "29nm323720302",
     },
     {
       thumbnail: "",
       title:
         "Blog Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
       notif: true,
       id: "29nm323720302",
     },
     {
       thumbnail: "",
       title:
         "Blog Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
       notif: false,
       id: "29nm323720302",
     },
   ];


  const comment_data = {
    labels: ["Appreciation", "Spam ", "Neutral", "Hate"],
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

  const overall_data = {
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

  const data = {
    type: "Blog",
    comment_data,
    overall_data,
    thumbnail: "",
    title:
      "Blog Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    user_img: "",
    user_name: "Rajesh Khadka",
    like: "50",
    comment: "5",
    color: "#3093ee",
  };
  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={data.type}
      />
      <History data={history_data}/>
      {/* <Visualizer
        handleSearch={handleSearch}
        onSearch={onSearch}
        search={search}
        data={data}
      /> */}
    </>
  );
};

export default Blog;
