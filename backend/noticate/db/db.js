const mongoose = require('mongoose');
const connOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
//const connStr = "mongodb://localhost:27017/noticate";
const connStr = "mongodb://0.0.0.0:27017/noticate";

// Connect to the local databse
mongoose.connect(connStr, connOptions);
mongoose.Promise = global.Promise;

// Get the user schemas
const User = require('./usermodel.js');

module.exports = {
	User
};
