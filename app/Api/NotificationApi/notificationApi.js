const express     = require("express");
const objectId    = require("mongodb").ObjectID;
const TelegramBot = require('node-telegram-bot-api');

require('dotenv/config')

const connectionFunc = require("../../Data/mongoClient.js").connect;

const app = express();
const jsonParser = express.json();

const config = {
  db: 'stock-notice',
  collection: 'notifications',
  telegramToken: '869548122:AAGPVRh5BN8laZdT2yENutKaxh55C0bsfFo'
}

var proc = process;

console.log(process.env, 'envs');


const TOKEN = config.telegramToken;

const bot = new TelegramBot(TOKEN, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "мушук-пушук");
});





connectionFunc(app, config);


//add
app.post("/api/notification/add", jsonParser, function (req, res) {

  const collection = req.app.locals.collection;

  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self'");

  res.json(req.headers);



  // collection.find({}).toArray(function (err, users) {

  //   if (err) return console.log(err);
  //   res.send(users)
  // });

});

app.get("/api/users/:id", function (req, res) {

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;

  collection.findOne({ _id: id }, function (err, user) {

    if (err) return console.log(err);
    res.send('user');
  });
});

app.post("/api/users", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user = { name: userName, age: userAge };

  const collection = req.app.locals.collection;
  collection.insertOne(user, function (err, result) {

    if (err) return console.log(err);
    res.send(user);
  });
});

app.delete("/api/users/:id", function (req, res) {

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({ _id: id }, function (err, result) {

    if (err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});

app.put("/api/users", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const userName = req.body.name;
  const userAge = req.body.age;

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate({ _id: id }, { $set: { age: userAge, name: userName } },
    { returnOriginal: false }, function (err, result) {

      if (err) return console.log(err);
      const user = result.value;
      res.send(user);
    });
});
