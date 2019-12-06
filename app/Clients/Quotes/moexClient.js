'use strict'

const clientBase = require('../ClientBase/clientBase.js');

const BASE_URL = 'https://iss.moex.com/iss/engines';

const getAllPrices = () => {
  return new Promise((resolve, reject) => {
    clientBase.get(`${BASE_URL}/stock/markets/shares/boards/TQBR/securities.json`)
      .then(response => {
        const marketdata = response.marketdata;

        const symbol = getColumn('SECID', marketdata.columns);
        const price = getColumn('LAST', marketdata.columns);

        var result = marketdata.data.map((element, index) => {
          return {
            symbol: element[symbol],
            price: element[price]
          }
        });
        //SECID //LAST
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getColumn = (name, array) => {
  var val = array.findIndex((element, index) => {
    return element == name;
  });

  return val;
}

module.exports.getAllPrices = getAllPrices;