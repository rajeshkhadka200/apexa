import mongoose from "mongoose";

const harshSchema = new mongoose.Schema({
  userDetails: {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  contentDetails: {
    contentType: {
      type: String,
    },
    video_id: {
      type: String,
    },
    blogUrl: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
});

const harsh = mongoose.model("harsh", harshSchema);
export default harsh;
