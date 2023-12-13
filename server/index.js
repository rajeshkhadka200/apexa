import express from "express";
import { connectMindsDB } from "./utils/mindsdb.js";
const app = express();
const PORT = process.env.PORT || 3002;

//connection to mindsdb local instance
connectMindsDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Listening to the port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
