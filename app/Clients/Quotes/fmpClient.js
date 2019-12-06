'use strict'

const clientBase = require('../ClientBase/clientBase.js');

const BASE_URL = 'https://financialmodelingprep.com/api/v3';

const getAllPrices = () => {
  return new Promise((resolve, reject) => {
    clientBase.get(`${BASE_URL}/stock/real-time-price`)
      .then(response => {
        resolve(response.stockList);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports.getAllPrices = getAllPrices;