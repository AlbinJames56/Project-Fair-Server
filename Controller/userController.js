const users = require("../models/userSchema");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  // console.log("inside register function");
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      res.status(406).json("User ALready Exists.. Please login..");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        profile: "",
        github: "",
        linkedin: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.login = async (req, res) => {
  // console.log("inside register function");
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email, password });
    // console.log(existingUser);
    if (existingUser) {
      // generate token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("Invalid email/ password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
