const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  platform: String,
  plan: String,
  price: Number,
  startDate: String,
  expiryDate: String,
  autoRenewal: Boolean,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
