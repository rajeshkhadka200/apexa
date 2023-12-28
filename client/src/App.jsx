import React from "react";
import Router from "./route";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

export default App;
