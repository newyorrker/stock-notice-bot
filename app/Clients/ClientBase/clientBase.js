'use strict'

const https = require('https');

const get = url => {
  return new Promise((resolve, reject) => {

    https.get(url, (resp) => {

      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        //console.info('new chunk', chunk);
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          resolve(JSON.parse(data));
        }
        catch(err) {
          reject(err.message)
        }
      });

    }).on("error", (err) => {
      reject(err.message)
      console.log("Error: " + err.message);
    });

  });
};

module.exports.get = get;