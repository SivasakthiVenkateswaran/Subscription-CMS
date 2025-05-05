const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: String,
  entityType: String,
  entityId: mongoose.Schema.Types.ObjectId,
  oldValues: Object,
  newValues: Object,
  ipAddress: String,
  userAgent: String,
  timestamp: Date
});

AuditLogSchema.index({ adminId: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
