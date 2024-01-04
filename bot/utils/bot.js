import { getHarshComments } from "./function.js";
import message from "./message.js";
import sendEmail from "./sendEmail.js";

const bot = async () => {
  try {
    console.log("🚀 Bot is initializing...");
    const harshComments = await getHarshComments();
    if (harshComments.length === 0) {
      console.log("-> No Harsh Comments Found");
      return;
    }
    harshComments.map(async (comment) => {
      const data = await getAppInfo(
        comment.app,
        comment.tracker.user_id,
        comment.tracker.id
      );

      const user = await getUserInfo(comment.tracker.user_id);
      const html = message(user, data);
      const res = await sendEmail(
        user.email,
        `${comment.type} Comment Detected`,
        html
      );
      console.log(res.message);

      if (!res.status) {
        return;
      }
      const saveDb = await Harsh.findOneAndUpdate(
        { _id: comment._id },
        { status: "sent" },
        { new: true }
      );

      if (saveDb) {
        console.log("-> Comment Status Updated");
        return;
      }
    });
  } catch (error) {
    console.log("Bot Failed to run:", error.message);
  }
};

export default bot;
