import User from "../model/user.schema.js";
import MindsDB from "mindsdb-js-sdk";

export const getYtData = async (req, res) => {
  try {
    const { video_id, user_id } = req.body;
    // const db = await MindsDB.default.Databases.getDatabase("mindsdb_youtube");

    const view_query = `
    CREATE VIEW comment_recent AS (
     SELECT display_name,comment
     FROM mindsdb_youtube.comments
     WHERE video_id = 'EJLrssH1ip0'
    );`;

    const viewStatus = await MindsDB.default.SQL.runQuery(view_query);

    //now get the comments one by one and ask mindsdb model to predict the sentiment
    const comments = await MindsDB.default.SQL.runQuery(
      `SELECT * FROM comment_recent`
    );
    console.log(comments.rows.length);
    let sentiment = [];
    for (let i = 0; i < 3; i++) {
      const comment = comments.rows[i].comment;
      const sentiment_result = await MindsDB.default.SQL.runQuery(
        `SELECT comment, sentiment FROM mindsdb.comment_analyzer WHERE comment="${comment}";`
      );
      console.log(sentiment_result);
      sentiment.push(sentiment_result.rows[i]?.sentiment);
    }
    console.log(sentiment);
  } catch (error) {
    console.log("Error", error);
  }
};
