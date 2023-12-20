import MindsDB from "mindsdb-js-sdk";

export const connectMindsDB = async () => {
  try {
    await MindsDB.default.connect({
      host: "http://127.0.0.1:47334",
    });
    console.log("MindsDB connected");
  } catch (error) {
    // Failed to connect to local instance
    console.log(error);
  }
  // const query = "SHOW HANDLERS WHERE type = ‘ml'";
  // result = await MindsDB.SQL.runQuery(query);
  // console.log(result);
};
