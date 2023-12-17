import express from "express";
import { connectMindsDB } from "./utils/mindsdb.js";
import MindsDB from "mindsdb-js-sdk";

const app = express();
const PORT = process.env.PORT || 3000;

//connection to mindsdb local instance
connectMindsDB();

// const getDb = async () => {
//   const currentDb = await MindsDB.default.Databases.getDatabase(
//     "mindsdb_youtube"
//   );
//   console.log(currentDb)
// }

// getDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Listening to the port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
