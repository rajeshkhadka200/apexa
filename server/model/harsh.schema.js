import mongoose from "mongoose";

const harshSchema = new mongoose.Schema({
  app: {
    type: String,
  },
  trackedBy: {
    type: String,
  },
  username: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const Harsh = mongoose.model("Harsh", harshSchema);
export default Harsh;
