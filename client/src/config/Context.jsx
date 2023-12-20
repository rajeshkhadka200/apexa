import React, { createContext, useEffect, useState } from "react";
import axios from "./axios.js";
export const ContextProvider = createContext();

const Context = ({ children }) => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  useEffect(() => {
    if (accessToken !== null) {
      fetchUser();
    }
  }, []);

  const [user, setUser] = useState();

  //getting access token through refresh token
  const getAccessToken = async () => {
    try {
      if (localStorage.getItem("refresh")) {
        const res = await axios.post("/token/refresh", {
          refreshToken: refreshToken,
        });
        if (res) {
          localStorage.setItem("access", res.data.accessToken);
          return res.data.accessToken;
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.replace("/");
      }
      console.log(error);
    }
  };

  //fetching user details from accestoken
  const fetchUser = async () => {
    try {
      const res = await axios.get("/user", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      setUser(res?.data?.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await axios.get("/user", {
          headers: {
            "x-access-token": accessTok,
          },
        });
        console.log(res);
        setUser(res?.data?.user);
      }
      console.log(error);
    }
  };

  return (
    <>
      <ContextProvider.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
