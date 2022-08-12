import mongoose from "mongoose";

const ConnectDB = () => {
  const mongoConfig = {
    useUnifiedTopology: true,
    useNewURLParser: true,
  };

  const mongoURL = "mongodb://127.0.0.1:27017/supabase";

  try {
    mongoose.connect(mongoURL, mongoConfig);
    console.log("MongoDB Connected Successfully...");
  } catch (error) {
    console.log(error.message);
    console.log("DB is not connected !");
  }
};

export default ConnectDB;
