const MongoClient       = require("mongodb").MongoClient;
const connectionString  = require("../Configuration/config.js").connectionString;

const mongoClient = new MongoClient(connectionString, { useNewUrlParser: true });

const connect = (app, config) => {

  mongoClient.connect(function (err, client) {
    if (err) return console.log(err);

    app.locals.collection = client.db(config.db).collection(config.collection);

    app.listen(3000, function () {
      console.log("Сервер ожидает подключения...");
    });
  });

}

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  console.log("Завершено")
  mongoClient.close();
  process.exit();
});

module.exports.connect = connect;