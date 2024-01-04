import mongoose from "mongoose";

const harshSchema = new mongoose.Schema({
  app: {
    type: String,
  },
  tracker: {
    id: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  username: {
    type: String,
  },
  comment: {
    type: String,
  },
  type:{
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Harsh = mongoose.model("Harsh", harshSchema);
export default Harsh;
