var config = {};
  
config.database = {};

config.database.test = 'mongodb://@localhost:27017/test';
config.database.prod = 'mongodb://@localhost:27017/prod';
config.port = process.env.PORT || 3000;


module.exports = config;