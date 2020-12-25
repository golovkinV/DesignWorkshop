const dbConfig = require("./config/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// MODELS
db.user = require("./models/user.js")(mongoose);
db.role = require("./models/role.js")(mongoose);

module.exports = db;