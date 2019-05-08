const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'shimla11', {
  dialect: 'mysql',
  host: 'localhost'
});


module.exports = sequelize;