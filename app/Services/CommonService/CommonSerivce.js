const NotificationDocumentSchema = require('../../Data/Models/NotificationsDocumentModel').schema;

var fmpClient = require('../../Clients/Quotes/fmpClient');
var moexClient = require('../../Clients/Quotes/moexClient.js');


function CommonService(NotificationService, mongoose, bot) {

  const _notificationService = new NotificationService();

  const watchPrice = async () => {

    //получаем все уведомления раз в определенный интервал времени обновляем список
    //цены получаем каждую секунду и сразу же запускаем функцию на матчинг

    let notices = await _notificationService.getNotifications(mongoose, NotificationDocumentSchema);

    setInterval(async () => {
      notices = await _notificationService.getNotifications(mongoose, NotificationDocumentSchema);
      console.log('notices updated');
    }, 5000);


    setInterval(async () => {

      const pricesFromAllResources = await getPrices();
      const prices = pricesFromAllResources.reduce((prev, next) => prev.concat(next), []);

      getMatching(prices, notices);

    }, 1000);


  }

  const getPrices = () => {

    return Promise.all([
      fmpClient.getAllPrices(),
      moexClient.getAllPrices()
    ]);

  }

  //пройтись по уведомлениям и по каждому уведомлению найти акцию
  //сравнить цену и получить значение матч
  const getMatching = (symbols, notices) => {
    notices.forEach(notice => {
      match = symbols.some(stockItem => {
        return stockItem.symbol == notice.Symbol && notice.Price == stockItem.price;
      })
    });
  }

  return {
    watchPrice: watchPrice
  }

}

module.exports = CommonService;