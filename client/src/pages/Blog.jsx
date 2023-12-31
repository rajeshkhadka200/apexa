import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import BlogHistory from "../components/BlogHistory";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const Blog = () => {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const onSearch = () => {
    if (search === "") {
      toast.error("Please enter a Hashnode link");
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
  const [isEmpty, setisEmpty] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`user/getblogHistory/${user_id}`);
        if (res.status === 200) {
          setblogHistory(res.data.history);
        }
        if (res.status === 204) {
          setisEmpty(true);
        }

        setLoading(false);
      } catch (error) {
        //  when server encounters an error
        setLoading(false);
        toast.error("Unable to get the blogs.");
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
            You havent tracked any blogs previously.
          </span>
        </div>
      ) : (
        <BlogHistory data={blogHisory} />
      )}
    </>
  );
};

export default Blog;
