const mongoose = require('mongoose');

const NotificationDocumentSchema = mongoose.Schema({
  _id: {
    type: String,
    require: true
  },
  Text: String,
  RawText: {
    type: String,
    require: true
  },
  Symbol: String,
  Price: {
    type: Number,
    require: true
  },
  DateCreate: {
    type: Date,
    default: Date.now
  },
  DateActuation: {
    type: Date,
    default: null
  },
  Active: {
    type: Boolean,
    default: true
  },
  UserId: Number
});

module.exports.model = mongoose.model('Notifications', NotificationDocumentSchema);
module.exports.schema = NotificationDocumentSchema;