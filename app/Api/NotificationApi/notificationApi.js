var express = require('express');
var router = express.Router();

const jsonParser = express.json();


const NotificationModel = require('../../Data/Models/NotificationsModel')


// define the home page route
router.post('/add', jsonParser, function (req, res) {
  const notice = new NotificationModel({
    Text: req.body.Text,
    UserId: req.body.UserId
  })

  notice.save()
  .then(data => {
    res.json(data)
  })
  .catch(error => {
    res.json({message: error})
  })
});
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds');
});



module.exports = router;




const TelegramBot = require('node-telegram-bot-api');

const config = {
  db: 'stock-notice',
  collection: 'notifications',
  telegramToken: '869548122:AAGPVRh5BN8laZdT2yENutKaxh55C0bsfFo'
}

const TOKEN = config.telegramToken;

// const bot = new TelegramBot(TOKEN, { polling: true });

var proc = process;

//add
// app.post("/api/notification/add", jsonParser, function (req, res) {

//   const collection = req.app.locals.collection;

//   res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self'");

//   res.json(req.headers);

// });



// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {


//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "мушук-пушук");
// });