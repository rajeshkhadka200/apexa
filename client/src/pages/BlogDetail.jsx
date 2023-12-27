import React, { useEffect, useState } from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import { useLocation } from "react-router-dom";
import { ContextProvider } from "../config/Context";
import axios from "../config/axios.js";

const BlogDetail = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = React.useContext(ContextProvider);
  const [details, setDetails] = React.useState();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {};

  const { state } = useLocation();
  const link = state?.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `/hashnode`,
          {
            user_id: user?._id,
            blogURL: link,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDetails(res.data.data);
      } catch (error) {
        console.log("Error fecting data");
      }
    };
    fetchData();
  }, []);

  const comment_data = {
    labels: ["Appreciation", "Spam", "Neutral", "Hate"],
    datasets: [
      {
        label: "Percentage",
        data: [
          details?.insights?.appreciation,
          details?.insightsinsight?.spam,
          details?.insights?.neutral,
          details?.insights?.hate,
        ],
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
        data: [
          details?.insights?.overall?.like,
          details?.insights?.overall?.dislike,
        ],
        backgroundColor: ["#994abe", "#3093ee"],
        hoverOffset: 4,
        borderColor: "#1B1B1B",
        borderWidth: 2,
        radius: 85,
      },
    ],
  };
  const data = {
    type: "yt",
    comment_data,
    overall_data,
    thumbnail: details?.details?.thumbnail,
    title: details?.details?.title,
    user_img: "",
    user_name: details?.details?.creator,
    like: details?.details?.like,
    comment: details?.details?.comment,
    color: "#f96f10",
    summary: details?.summary,
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
