const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userSubscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSubscription'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPlan'
  },
  amount: Number,
  currency: String,
  paymentMethod: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  paymentGatewayResponse: Object,
  createdAt: Date,
  transactionReference: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
