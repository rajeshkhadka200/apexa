import React from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";

const BlogDetail = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = () => {};

  const comment_data = {
    labels: ["Appreciation", "Spam", "Neutral", "Hate"],
    datasets: [
      {
        label: "Percentage",
        data: [22.72, 27.27, 13.63, 36.36],
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
    user_name: "Utsav Bhattarai",
    like: "50",
    comment: "5",
    color: "#f96f10",
  };
  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={data.type}
      />
      <Visualizer
        handleSearch={handleSearch}
        onSearch={onSearch}
        search={search}
        data={data}
      />
    </>
  );
};

export default BlogDetail;
