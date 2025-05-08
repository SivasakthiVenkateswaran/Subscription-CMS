const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const authenticateUser = require('../middleware/auth');

// GET user's subscriptions
router.get("/", authenticateUser, async (req, res) => {
  const subscriptions = await Subscription.find({ userId: req.user.id });
  res.json(subscriptions);
});

// POST new subscription
router.post("/", authenticateUser, async (req, res) => {
  const sub = new Subscription({ ...req.body, userId: req.user.id });
  const saved = await sub.save();
  res.json(saved);
});

// PUT update
router.put("/:id", authenticateUser, async (req, res) => {
  const updated = await Subscription.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", authenticateUser, async (req, res) => {
  await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;
