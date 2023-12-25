import mongoose from "mongoose";

const ytSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  details: {
    video_id: {
      type: String,
    },
    video_url: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
    },
    creator: {
      type: String,
    },
    creator_pic: {
      type: String,
    },
    like: {
      type: Number,
    },
    comment: {
      type: Number,
    },
  },
  insight: {
    appreciation: {
      type: Number,
    },
    hate: {
      type: Number,
    },
    neutral: {
      type: Number,
    },
    spam: {
      type: Number,
    },
    overall: {
      like: {
        type: Number,
      },
      dislike: {
        type: Number,
      },
    },
  },
  summary: {
    type: String,
  },
  prevComment: {
    type: Number,
  },
  notif: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Yt = mongoose.model("Yt", ytSchema);
export default Yt;
