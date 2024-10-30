const users = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// register controller
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

//update profile controller
exports.updateProfile = async (req,res) => {
  const { profileImg, github, linkedin } = req.body;
  const uploadImg = req.file ? req.file.filename : profileImg;
  try {
    const currentProfile = await users.findById({ _id: req.payload });
    const { username, email, password } = currentProfile;

    const profile = await users.findByIdAndUpdate(
      { _id: req.payload },
      { username, email, password, profile: uploadImg, github, linkedin },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    res.status(401).json(err);
  }
};
//get userProfile
exports.getProfile = async (req,res) => {
  const userId = req.payload;
  try {
    const profile = await users.findById({ _id: req.payload });
    res.status(200).json(profile);
  } catch (err) {
    res.status(401).json(err);
  }
};
