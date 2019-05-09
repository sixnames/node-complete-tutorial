const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://admin:rBSBbD9uhqVC3!b@cluster0-nb3qo.mongodb.net/shop?retryWrites=true')
    .then((client) => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
