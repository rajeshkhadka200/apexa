import React from "react";
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

  return (
    <>
      <SearchBox
        search={search}
        handleSearch={handleSearch}
        onSearch={onSearch}
        type={"blog"}
      />
      <History data={history_data}/>

    </>
  );
};

export default Blog;
