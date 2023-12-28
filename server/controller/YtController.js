import User from "../model/user.schema.js";
import Yt from "../model/yt.schema.js";
import MindsDB from "mindsdb-js-sdk";
import {
  getComments,
  getPercentage,
  getSentiment,
  getSummary,
  getVideoData,
} from "../utils/function.js";

export const getYtData = async (req, res) => {
  try {
    const { video_id, user_id } = req.body;
    console.log("Video id: ", video_id);
    console.log("User id: ", user_id);
    // const user_id = "60b9b6f0c9b0c9b9e0a1a1a1";
    // const video_id = "bqjmvJFHGbw";

    const ytData = await Yt.findOne({ "details.video_id": video_id });

    const comments = await getComments(video_id);
    const videos = await getVideoData(video_id);
    if (ytData) {
      console.log("Video id exist in DB");
      if (comments.rows.length > ytData.prevComment) {
        console.log("New comments found");
        const sentiment = await getSentiment(
          ytData.prevComment,
          comments.rows,
          "youtube"
        );

        console.log("The total no. of new sentiment: ", sentiment.length);
        console.log(sentiment);

        const {
          appreciation_percentage,
          hate_percentage,
          neutral_percentage,
          spam_percentage,
        } = getPercentage(sentiment);

        const newAppreciation =
          (ytData.insight.appreciation * ytData.prevComment +
            appreciation_percentage * sentiment.length) /
          (ytData.prevComment + sentiment.length);

        const newHate =
          (ytData.insight.hate * ytData.prevComment +
            hate_percentage * sentiment.length) /
          (ytData.prevComment + sentiment.length);

        const newNeutral =
          (ytData.insight.neutral * ytData.prevComment +
            neutral_percentage * sentiment.length) /
          (ytData.prevComment + sentiment.length);

        const newSpam =
          (ytData.insight.spam * ytData.prevComment +
            spam_percentage * sentiment.length) /
          (ytData.prevComment + sentiment.length);

        const newLike = newAppreciation + (100 - newHate - newAppreciation) / 2;
        const newDislike = 100 - newLike;

        //update the data in DB
        const updatedData = await Yt.findOneAndUpdate(
          { "details.video_id": video_id },
          {
            insight: {
              appreciation: newAppreciation,
              hate: newHate,
              neutral: newNeutral,
              spam: newSpam,
              overall: {
                like: newLike,
                dislike: newDislike,
              },
            },
            prevComment: comments.rows.length,
          },
          { new: true }
        );

        //send to frontend
        return res.status(200).json({
          message: "Success",
          data: updatedData,
        });
      }

      //send to frontend
      return res.status(200).json({
        message: "Success",
        data: ytData,
      });
    } else {
      console.log("Processing for new yt video");
      console.log(comments.rows.length);
      const sentiment = await getSentiment(0, comments.rows, "youtube");

      console.log("The total no. of sentiment: ", sentiment.length);
      console.log(sentiment);

      const {
        appreciation_percentage,
        hate_percentage,
        neutral_percentage,
        spam_percentage,
        like_percentage,
        dislike_percentage,
      } = getPercentage(sentiment);

      const summary = await getSummary(videos, "youtube");

      // Save to DB
      const yt = new Yt({
        user_id: user_id,
        details: {
          video_id: video_id,
          video_url: `https://www.youtube.com/watch?v=${video_id}`,
          thumbnail: `https://img.youtube.com/vi/${video_id}/0.jpg`,
          title: videos.rows[0]?.title,
          creator: videos.rows[0]?.channel_title,
          creator_pic: "",
          like: videos.rows[0]?.like_count,
          comment: comments.rows.length,
        },
        insight: {
          appreciation: appreciation_percentage,
          hate: hate_percentage,
          neutral: neutral_percentage,
          spam: spam_percentage,
          overall: {
            like: like_percentage,
            dislike: dislike_percentage,
          },
        },
        summary: summary,
        prevComment: comments.rows.length,
      });
      await yt.save();

      //send to frontend
      res.status(200).json({
        message: "Success",
        data: yt,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const deleteYTHistory = async (req, res) => {
  const { video_id } = req.params;
  try {
    const deletedData = await Yt.findOneAndDelete({
      "details.video_id": video_id,
    });

    return res.status(200).json({
      mesg: deletedData.details.title + " Deleted syccessfully",
      id: deletedData.details.video_id,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Internal Server Error, while deleting video",
    });
  }
};
