import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Visualizer from "../components/Visualizer";
import SearchBox from "../components/SearchBox";
import CircularProgressBar from "../components/CircularProgressBar";
import axios from "../config/axios";
import { ContextProvider } from "../config/Context";

const YtDetail = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [details, setDetails] = React.useState();

  const navigate = useNavigate();

  const { usr } = useContext(ContextProvider);
  const [user, setUser] = usr;

  //get the id from the route url
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user?._id, " ",id)
        const res = await axios.post(
          `/yt`,
          {
            user_id: user?._id,
            video_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDetails(res.data.data);
        if (res) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        navigate("/app/yt");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    return;
  };

  const comment_data = {
    labels: ["Appreciation", "Spam", "Neutral", "Hate"],
    datasets: [
      {
        label: "Percentage",
        data: [details?.insight?.appreciation, details?.insight?.spam, details?.insight?.neutral, details?.insight?.hate],
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
        data: [details?.insight.overall?.like, details?.insight.overall?.dislike],
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

  //loading screen
  if (loading) {
    return (
      <>
        <div className={"loading_wrapper"}>
          <CircularProgressBar value={progress} color="#f96f10" />
          <h1 className={"loading_text"}>
            Hold tight! Crunching Data for you <span className="emoji">🫵</span>
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <SearchBox
        search={id}
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

export default YtDetail;
