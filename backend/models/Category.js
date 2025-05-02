const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('Category', CategorySchema);
