import ConnectDB from "./connenction";
import mongoose from "mongoose";

ConnectDB();

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    avatar_url: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
