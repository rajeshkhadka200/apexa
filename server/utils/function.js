import MindsDB from "mindsdb-js-sdk";

export const getPercentage = (sentiment, like_count, view_count) => {
  const appreciation = sentiment.filter((x) => x === "Appreciation").length;
  const hate = sentiment.filter((x) => x === "Hate").length;
  const neutral = sentiment.filter((x) => x === "Neutral").length;
  const spam = sentiment.filter((x) => x === "Spam").length;

  const appreciation_percentage = (appreciation / sentiment.length) * 100;
  const hate_percentage = (hate / sentiment.length) * 100;
  const neutral_percentage = (neutral / sentiment.length) * 100;
  const spam_percentage = (spam / sentiment.length) * 100;

  const like_percentage =
    appreciation_percentage +
    (100 - hate_percentage - appreciation_percentage) / 2;

  const dislike_percentage = 100 - like_percentage;

  return {
    appreciation_percentage,
    hate_percentage,
    neutral_percentage,
    spam_percentage,
    like_percentage,
    dislike_percentage,
  };
};

//Insight Processing
export const getSentiment = async (initial, comments, app) => {
  let sentiment = [];
  const reversedComments = app === "youtube" ? comments.reverse() : comments;
  for (let i = initial; i < reversedComments.length; i += 5) {
    let comment = "";
    for (let j = 0; j < 5; j++) {
      if (reversedComments[i + j]?.comment !== undefined) {
        comment += `{${reversedComments[i + j]?.comment}}& \n`;
      }
    }
    console.log(comment);
    const sentiment_result = await MindsDB.default.SQL.runQuery(
      `SELECT comment, sentiment FROM mindsdb.comment_analyzer WHERE comment="${comment}";`
    );

    console.log(sentiment_result);

    if (sentiment_result.rows[0]?.sentiment !== undefined) {
      const sentimentArray = sentiment_result.rows[0]?.sentiment.split(", ");
      sentimentArray.forEach((element) => {
        sentiment.push(element);
      });
    }
  }

  sentiment.forEach((element, index) => {
    if (
      element !== "Appreciation" &&
      element !== "Hate" &&
      element !== "Neutral" &&
      element !== "Spam"
    ) {
      sentiment.splice(index, 1);
    }
  });

  return sentiment;
};

// Summary Processing
export const getSummary = async (data, app) => {
  if (app === "youtube") {
    console.log(data)
    const transcript = data.rows[0]?.transcript;
    const transcriptArray = JSON.parse(transcript);
    const joinedText = transcriptArray.map((item) => item.text).join(" ");

    const summary_result = await MindsDB.default.SQL.runQuery(`
        SELECT transcript, summary
        FROM mindsdb.text_summary
        WHERE transcript="${joinedText}";
       `);

    const summary = summary_result.rows[0]?.summary;
    return summary;
  }
  //remove all the slashes, **, #, \n and markdown formatting syntax, links and images

  const summary_result = await MindsDB.default.SQL.runQuery(`
        SELECT markdown, summary
        FROM mindsdb.blog_summary
        WHERE markdown="${data}";
       `);

  return summary_result.rows[0]?.summary;
};

export const getVideoData = async (video_id) => {
  const videos = await MindsDB.default.SQL.runQuery(
    `SELECT * FROM mindsdb_youtube.videos
           WHERE video_id = '${video_id}';`
  );

  return videos;
};

export const getComments = async (video_id) => {
  const comments = await MindsDB.default.SQL.runQuery(
    `SELECT * FROM mindsdb_youtube.comments
       WHERE video_id = '${video_id}';`
  );

  return comments;
};

export const removeMarkdownSyntax = (data) => {
  const regex = /(\r\n|\n|\r)/gm;
  const regex2 = /(\*\*|__)(.*?)\1/gm;
  const regex3 = /(\*|_)(.*?)\1/gm;
  const regex4 = /(\#)(.*?)\1/gm;
  const regex5 = /(\!\[)(.*?)(\]\()(.*?)(\))/gm;
  const regex6 = /(\[)(.*?)(\]\()(.*?)(\))/gm;
  const regex7 = /(\`)(.*?)(\`)/gm;
  const regex8 = /(\~\~)(.*?)(\~\~)/gm;
  const regex9 = /(<([^>]+)>)/gi;
  // remove double quotes
  const regex10 = /\"/gm;

  const result = data
    .replace(regex, "")
    .replace(regex2, "$2")
    .replace(regex3, "$2")
    .replace(regex4, "$2")
    .replace(regex5, "")
    .replace(regex6, "$2")
    .replace(regex7, "$2")
    .replace(regex8, "$2")
    .replace(regex9, "")
    .replace(regex10, "");

  return result;
};
