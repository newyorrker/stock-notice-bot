const mongoose = require('mongoose');
const shortid = require('shortid')

const NotificationSchema = mongoose.Schema({
  _id: {
    type: String,
    require: false,
    default: shortid.generate()
  },
  Text: String,
  RawText: {
    type: String,
    require: true
  },
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

module.exports = mongoose.model('Notifications', NotificationSchema);