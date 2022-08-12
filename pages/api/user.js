import User from "../../utils/mongo/userSchema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("hitted get");
    try {
      let allUser;
      if (req.query.id) {
        allUser = await User.findById(req.query.id);
      } else {
        allUser = await User.find();
      }
      res.status(200).json(allUser);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: "BAD", error: error.message });
    }
  } else if (req.method === "POST") {
    // User.init();
    const newUser = new User(req.body);
    console.log("api hitted post");
    try {
      const addedUser = await newUser.save();
      // const addedUser = await User.findOne();
      console.log("added", addedUser);
      res.status(201).json(addedUser);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ err: error.message, status: "error server" });
    }
  }
}
