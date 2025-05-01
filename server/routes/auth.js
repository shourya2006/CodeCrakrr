const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = "ChotiGold$Arc";
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("email").isEmail().withMessage("Invalid email"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],

  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });
      const data = {
        user: {
          id: user._id,
        },
      };
      let authToken = jwt.sign(data, SecretKey);
      res.status(201).json({ authToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 1 }).withMessage("Password Can't be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      let authToken = jwt.sign(data, SecretKey);
      res.status(201).json({ authToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
