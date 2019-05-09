const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://admin:rBSBbD9uhqVC3!b@cluster0-nb3qo.mongodb.net/test?retryWrites=true')
    .then((result) => {
      console.log('Connected');
      callback(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
