const express = require("express");
const User = require("../models/User");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    confirmPassword: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    address: req.body.address,
    phone: req.body.phone,
    img: req.body.img,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  console.log(req.body.userInfo);
  try {
    const user = await User.findOne({ username: req.body.userInfo.username });
    console.log(user);

    if (!user) {
      return res.status(401).json("you are entered wrong username");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body.userInfo.password;

      if (originalPassword === inputPassword) {
        return res.status(401).json("Password is already existed");
      } else {
        const inputPasswordHashed = CryptoJS.AES.encrypt(
          req.body.userInfo.password,
          process.env.PASS_SEC
        ).toString();

        user.password = inputPasswordHashed;

        const savedUser = await user.save();
        return res.status(201).json(savedUser);
      }
    }
  } catch {}
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong credentials");
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
