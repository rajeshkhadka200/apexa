import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import BlogHistory from "../components/BlogHistory";

const Blog = () => {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const onSearch = () => {
    if (search === "") {
      alert("Please enter a Hashnode link");
      return;
    }
    const urlObject = new URL(search);
    const slugPart = urlObject.pathname.replace(/^\/+/, "");

    navigate(`/app/blog/${slugPart}`, {
      state: { search },
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //  request for the history performed by loged in user
  const [blogHisory, setblogHistory] = useState();
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(`user/getblogHistory/${user_id}`);
        setblogHistory(res.data.history);
      } catch (error) {
        console.log(error);
        console.log("Error fetching blog history data");
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
        type={"blog"}
      />
      <BlogHistory data={blogHisory} />
    </>
  );
};

export default Blog;
