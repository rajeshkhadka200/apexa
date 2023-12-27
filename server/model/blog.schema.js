import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  details: {
    blog_url: {
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
      // not found
    },
    like: {
      type: Number,
      // not found
    },
    comment: {
      type: Number,
    },
  },
  insights: {
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
  contentType: {
    type: String,
    default: "blog",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
