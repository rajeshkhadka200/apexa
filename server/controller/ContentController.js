import MindsDB from "mindsdb-js-sdk";
import { convertToArray } from "../utils/function.js";
export const generateContent = async (req, res) => {
  try {
    const { scope, details } = req.params;
    const content_result = await MindsDB.default.SQL.runQuery(`
    SELECT content
    FROM mindsdb.content_generator
    WHERE genre="${scope}" AND detail= "${details}";
   `);

    const inputText = content_result.rows[0].content;

    const contentIdeas = convertToArray(inputText);

    if (contentIdeas?.length === 0) {
      return res.status(204).json({
        status: "error",
        message: "No content found",
      });
    }

    res.status(200).json({
      status: "success",
      content: contentIdeas,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
