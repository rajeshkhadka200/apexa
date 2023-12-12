import React from "react";
import Visualizer from "../components/Visualizer";

const Blog = () => {
  const [search, setSearch] = React.useState("");
  const onSearch = () => {};
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const comment_data = {
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
      <Visualizer
        handleSearch={handleSearch}
        onSearch={onSearch}
        search={search}
        data={data}
      />{" "}
    </>
  );
};

export default Blog;
