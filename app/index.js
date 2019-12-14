'use strict'


const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/stock-notice', {useNewUrlParser: true }, () => {
  console.log('connected to DB');
})

app.listen(3000)

const notificationApi = require('./Api/NotificationApi/notificationApi.js')



app.use('/notifications', notificationApi);











function name(params) {

  var fmpClient = require('./Clients/Quotes/fmpClient.js');
  var moexClient = require('./Clients/Quotes/moexClient.js');

  var notices = require('./mockData.js').notices;


  let stockDataValue = [];

  var match = false;

  var i = 0;
  var j = 0;

  //пройтись по уведомлениям и по каждому уведомлению найти акцию
  //сравнить цену и получить значение матч
  const getMatching = (symbols) => {
    notices.forEach((notice, index) => {
      match = symbols.some(stockItem => {
        i++;
        return stockItem.symbol == notice.symbol && notice.price == stockItem.price;
      })
    });
  }

  const cb = () => {
    Promise.all([
      fmpClient.getAllPrices(),
      moexClient.getAllPrices()
    ])
      .then(data => {
        stockDataValue = data[0].concat(data[1]);

        getMatching(stockDataValue);

        console.info(stockDataValue);
      })
  }
}