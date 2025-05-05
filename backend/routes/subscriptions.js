const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

// Create
router.post("/", async (req, res) => {
  try {
    const sub = new Subscription(req.body);
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All
router.get("/", async (req, res) => {
  const subscriptions = await Subscription.find();
  res.json(subscriptions);
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
