'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.listen(3000);
mongoose.connect('mongodb://localhost:27017/stock-notice', { useNewUrlParser: true });

const notificationApi = require('./Api/NotificationApi/notificationApi').router;

//data
const NotificationDocumentSchema = require('./Data/Models/NotificationsDocumentModel').schema;
const NotificationDocumentModel = require('./Data/Models/NotificationsDocumentModel').model;

//notification
const NotificationService = require('./Services/NotificationService/NotificationService');

//bot
const BotService = require('./Services/BotService/BotService');
const _botService = new BotService(NotificationService);

const BotApi = require('./Api/BotApi/BotApi');
const _botApi = new BotApi();

const bot = _botService.bot;

//common
const CommonService = require('./Services/CommonService/CommonSerivce');
const _commonService = new CommonService(NotificationService, mongoose, bot);

_commonService.watchPrice()


// и проверить надо ли отправить уведомления
// после отправки уведомления сделать изменения в базе


//прежде чем отправить данные в базу, необходимо поянять цена ожидается выше текущего значения или ниже
_botApi.readMessage(bot, function(msg){
  console.log(msg.text);
  //_botService.saveNotice(msg, NotificationDocumentModel);
});

_botApi.readSpecificMessage(bot, /\/start/, function(msg) {
  console.log(msg.text);
  _botApi.sendMessage(bot, msg.chat.id, 'НАЧИНАЕМ...')
  //console.log(msg);
})

_botApi.readSpecificMessage(bot, /\/set/, function (msg) {
  _botApi.sendMessage(bot, msg.chat.id, 'Создаем уведомление...')

  //первая валидация на наличия настроек уведомления
  if (/\/set (.+)/.test(msg.text)) {
    _botApi.sendMessage(bot, msg.chat.id, "настройки вохможно присутствуют");
  } else {
    _botApi.sendMessage(bot, msg.chat.id, 'Настроек нет = (');
  }



  //console.log(msg);
})
//роуты
app.use('/notifications', notificationApi);


// // прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  console.log("Завершено")
  mongoose.disconnect();
  process.exit();
});