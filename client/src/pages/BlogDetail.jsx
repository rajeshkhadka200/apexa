import React, { useEffect, useState } from "react";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "../config/Context";
import axios from "../config/axios.js";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [contentLoading, setcontentLoading] = React.useState(true);
  const { user } = React.useContext(ContextProvider);
  const [details, setDetails] = React.useState();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {};

  const { state } = useLocation();
  console.log(state);
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
        
        if (res.status === 200) {
          setDetails(res.data.data);
          toast.success("Here we go with your insghts ! 🚀");
        }
        if (res.status === 204) {
          toast.error("We can not process blogs with 0 comments");
          navigate("/app/blog");
        }
        setcontentLoading(false);
      } catch (error) {
        if (error.response.status === 400) {
          toast.error("The Blog doesnot exits anywhere.");
          navigate("/app/blog");
          return;
        }
        toast.error("Unable to process the blog.");
        navigate("/app/yt");
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
        backgroundColor: [" #00b747", "#3093ee", "#994abe", "#f96f10"],
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
    type: "blog",
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
    notif: details?.notif,
    blog_url: details?.details?.blog_url,
  };

  if (contentLoading) {
    return (
      <>
        <div className="containerloader">
          <div class="loader"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <SearchBox
        search={link}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={"detail"}
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
