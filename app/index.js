'use strict'

var fmpClient = require('./Clients/Quotes/fmpClient.js');
var moexClient = require('./Clients/Quotes/moexClient.js');

const MongoClient = require("mongodb").MongoClient;

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

//cb()

// var price = setInterval(cb
// , 1000);

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
mongoClient.connect(function (err, client) {

  if (err) {
    return console.log(err);
  }

  const db = client.db('stock-notice');
  const collection = db.collection("notifications");

  let user = { name: "Tom", age: 23 };
  collection.insertOne(user, (err, result) => {

    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });

});