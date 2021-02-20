const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const NotificationService = require('../../Services/NotificationService/NotificationService');

const _notificationService = new NotificationService();

const jsonParser = express.json();


const NotificationDocumentModel = require('../../Data/Models/NotificationsDocumentModel').model;

router.post('/add', jsonParser, async (req, res) => {

  const chatMessageObject = _notificationService.ParseChatMessage(req.body.Text);

  const noticeDocument = new NotificationDocumentModel({
    _id: shortid.generate(),
    RawText: req.body.Text,
    Text: chatMessageObject.text,
    Price: chatMessageObject.price,
    Symbol: chatMessageObject.symbol,
    UserId: req.body.UserId
  })

  try {
    var notice = await noticeDocument.save();
    res.json(notice)
  } catch (error) {
    res.json({ message: error })
  }

});

module.exports.router = router;
