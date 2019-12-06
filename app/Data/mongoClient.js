const MongoClient = require("mongodb").MongoClient;
const config = require("../Configuration/config.js");

const connectionString = config.connectionString;

const mongoClient = new MongoClient(connectionString, { useNewUrlParser: true });

const connect = (app, config) => {

  mongoClient.connect(function (err, client) {
    if (err) return console.log(err);

    //убрать отсюда app и экспортировать необходимую коллекцию

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