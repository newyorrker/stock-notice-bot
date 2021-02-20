const TOKEN = require('../../Configuration/config').telegramToken;
const TelegramBot = require('node-telegram-bot-api');
const shortid = require('shortid');

const bot = new TelegramBot(TOKEN, { polling: true });

function BotService(NotificationService) {

  const _notificationService = new NotificationService();

  const saveNotice = (msg, NotificationDocumentModel) => {
    const chatId = msg.chat.id;
    const chatMessage = _notificationService.ParseChatMessage(msg.text);

    if (!chatMessage.symbol) {
      bot.sendMessage(chatId, 'Тикер обязателен');
      return;
    }

    if (!chatMessage.price) {
      bot.sendMessage(chatId, 'Цена обязательна');
      return;
    }

    const noticeDocument = new NotificationDocumentModel({
      _id: shortid.generate(),
      RawText: msg.text,
      Text: chatMessage.text,
      Price: chatMessage.price,
      Symbol: chatMessage.symbol,
      UserId: chatId
    });

    noticeDocument.save()
      .then(data => {
        bot.sendMessage(chatId, _notificationService.CreateSuccessMessage(data));
      })
      .catch(error => {
        bot.sendMessage(chatId, error.message);
      });
  }

  return {
    bot: bot,
    saveNotice: saveNotice
  }
}

module.exports = BotService