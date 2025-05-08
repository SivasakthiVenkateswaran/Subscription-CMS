const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  platform: String,
  plan: String,
  price: Number,
  startDate: Date,
  expiryDate: Date,
  autoRenewal: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // ✅ link to user
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
