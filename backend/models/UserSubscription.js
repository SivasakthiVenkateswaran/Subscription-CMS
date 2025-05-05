const mongoose = require('mongoose');

const UserSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPlan'
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled', 'pending'],
    default: 'pending'
  },
  startDate: Date,
  endDate: Date,
  autoRenew: Boolean,
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'other']
  },
  paymentDetails: {
    cardLast4: String,
    cardType: String,
    expiryDate: String
  },
  transactionHistory: [{
    transactionId: String,
    amount: Number,
    currency: String,
    status: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
});

UserSubscriptionSchema.index({ userId: 1, status: 1 });
UserSubscriptionSchema.index({ endDate: 1, status: 1 });

module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);
