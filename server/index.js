const dbConfig = require("./config/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// MODELS
db.user = require("./models/user")(mongoose);
db.role = require("./models/role")(mongoose);
db.tag = require("./models/tag")(mongoose);

module.exports = db;