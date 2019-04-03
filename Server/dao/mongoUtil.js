const { MongoClient } = require('mongodb');
const chalk = require('chalk');
const mongoConfig = require('./mongoConfig');

// collection(!) access object
let _col;

// MongoDB connect
const connectToServer = async () => {
  MongoClient.connect(`mongodb://localhost:${mongoConfig.port}/${mongoConfig.DBName}`, (err, db) => {
    if (err) {
      return console.log('MongoDB connection error! Start mongod first, check mongoConfig \n', err);
    }
    _col = db.db(`${mongoConfig.DBName}`).collection(`${mongoConfig.collectionName}`);
    return console.log(`Connected to MongoDB. Port - ${chalk.yellow(`:${mongoConfig.port}`)}. DB name - ${chalk.yellow(`${mongoConfig.DBName}`)}. Collection name - ${chalk.yellow(`${mongoConfig.collectionName}`)}`);
  });
};

const getCollection = () => _col;

module.exports = { connectToServer, getCollection };
