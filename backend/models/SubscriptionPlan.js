const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema({
  name: String,
  description: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    amount: Number,
    currency: { type: String, default: 'USD' }
  },
  duration: {
    value: Number,
    unit: { type: String, enum: ['day', 'week', 'month', 'year'], default: 'month' }
  },
  features: [String],
  isPopular: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
});

SubscriptionPlanSchema.index({ categoryId: 1, isActive: 1 });

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
