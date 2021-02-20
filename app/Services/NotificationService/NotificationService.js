module.exports = function NotificationService() {

  ///Парсит сообщение чата
  ///Принимает сообщение
  ///Возвращает объект с необходимыми данными
  parseChatMessage = message => {
    var messageGroup = message.split('-');

    return {
      symbol: messageGroup[0],
      price: messageGroup[1],
      text: messageGroup[2]
    }
  }

  ///Создает успешное сообщение
  createSuccessMessage = data => {
    return `Ваше уведомление сработает когда ${data.Symbol} достигнет цены ${data.Price}`;
  }

  //
  getNotifications = (mongoose, schema) => {

    const notifications = mongoose.model('Notifications', schema);

    return notifications.find();
  }

  return {
    ParseChatMessage: parseChatMessage,
    CreateSuccessMessage: createSuccessMessage,
    getNotifications: getNotifications
  }
}