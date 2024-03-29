import Blog from "../model/blog.schema.js";
import Yt from "../model/yt.schema.js";
import Harsh from "../model/harsh.schema.js";
import User from "../model/user.schema.js";

export const getHarshComments = async () => {
  const comments = await Harsh.find({ status: "pending" });
  let harshComments = [];

  await Promise.all(
    comments.map(async (comment) => {
      if (comment.app === "yt") {
        const ytData = await Yt.findOne({
          $and: [
            { "details.video_id": comment.tracker.id },
            { user_id: comment.tracker.user_id },
          ],
        });
        if (ytData && ytData.notif) {
          harshComments.push(comment);
        }
      } else {
        const blogData = await Blog.findOne({
          $and: [
            { "details.blog_url": comment.tracker.id },
            { user_id: comment.tracker.user_id },
          ],
        });
        if (blogData && blogData.notif) {
          harshComments.push(comment);
        }
      }
    })
  );

  return harshComments;
};

export const getAppInfo = async (app, user_id, id) => {
  if (app === "yt") {
    const ytData = await Yt.findOne({
      $and: [{ "details.video_id": id }, { user_id: user_id }],
    });
    return ytData;
  } else {
    const blogData = await Blog.findOne({
      $and: [{ "details.blog_url": id }, { user_id: user_id }],
    });
    return blogData;
  }
};

export const getUserInfo = async (user_id) => {
  const userData = await User.findOne({ _id: user_id });
  return userData;
};
