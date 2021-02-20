module.exports = function BotApi() {

  function sendMessage(bot, chatId, message) {
    bot.sendMessage(chatId, message)
  }

  function readMessage(bot, callback) {
    bot.on('message', function(msg) {
      callback(msg)
    })
  }

  function readSpecificMessage(bot, regExp, callback) {
    bot.onText(regExp, function (msg) {
      console.log(msg.text);
      callback(msg)
    })
  }

  return {
    readMessage: readMessage,
    sendMessage: sendMessage,
    readSpecificMessage: readSpecificMessage
  }
}