const express = require("express");
const router = express.Router();
const Handle = require("../models/Handle");
const fetchuser = require("../middleware/fetchuser");

router.get("/gethandle", fetchuser, async (req, res) => {
  try {
    const handle = await Handle.findOne({ userId: req.user.id });
    if (!handle) {
      return res.status(404).json({ error: "Handle not found" });
    }
    res.json(handle);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/addhandle", fetchuser, async (req, res) => {
  try {
    const { codeforcesHandle, leetcodeHandle, codechefHandle } = req.body;

    const existingHandle = await Handle.findOne({ userId: req.user.id });
    if (existingHandle) {
      existingHandle.codeforcesHandle = codeforcesHandle;
      existingHandle.leetcodeHandle = leetcodeHandle;
      existingHandle.codechefHandle = codechefHandle;
      await existingHandle.save();
      return res.json(existingHandle);
    }

    const handle = await Handle.create({
      userId: req.user.id,
      codeforcesHandle,
      leetcodeHandle,
      codechefHandle,
    });

    res.status(201).json(handle);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
