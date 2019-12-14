let collect = async () => {

  let collect = await MongoClient.connect(connectionString);

  console.log('in client')

  return collect.db('stock-notice').collection('notifications');

}

// // прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  console.log("Завершено")
  mongoClient.close();
  process.exit();
});

module.exports.collect = collect
//module.exports.notificationsCollection = notificationsCollection;