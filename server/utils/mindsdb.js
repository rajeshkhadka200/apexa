import MindsDB from "mindsdb-js-sdk";

export const connectMindsDB = async () => {
  try {
    await MindsDB.connect({
      host: "http://127.0.0.1:47334",
    });
    console.log("connected");
  } catch (error) {
    // Failed to connect to local instance
    console.log(error);
  }
};
