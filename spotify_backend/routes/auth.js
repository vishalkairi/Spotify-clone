const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, email, username, password } = req.body;
  if (!firstName || !password || !email || !username || !password) {
    return res.status(400).json({
      status: "fail",
      msg: "Please provide both username and password",
    });
  }

  try {
    //checking if user already exists
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ error: "User already exists with this email" });

    //Create a new user
    let lastName = req.body.lastName ? req.body.lastName : "";
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPwd,
    });

    //Create a token to return back to UI
    const token = await getToken(email, newUser);

    // Return the token to UI
    const userReturn = { ...newUser.toJSON(), token };
    delete userReturn.password;
    return res.status(201).json(userReturn);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  //Extracting email and password
  console.log(`Req received ${req.body}`);
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ error: "Please provide username and password" });
  }
  try {
    //Finding user with provided email id
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "Invalid credentials" });

    //Verifying the password
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      //Generating token
      const token = await getToken(email, user);
      const userReturn = { ...user.toJSON(), token };
      delete userReturn.password;
      return res.status(201).json(userReturn);
    } else {
      return res.status(403).json({ error: "Email or password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});
module.exports = router;
