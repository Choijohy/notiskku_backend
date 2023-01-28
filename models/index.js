const Sequelize  = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Category = require('./category');
const Notice = require('./notice');
const User = require('./user');
const Subscription = require('./subscription');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Subscription = Subscription;
db.Notice = Notice;
db.Category =  Category;

User.init(sequelize);
Category.init(sequelize);
Subscription.init(sequelize);
Notice.init(sequelize);

User.associate(db);
Subscription.associate(db);
Notice.associate(db);
Category.associate(db);

module.exports = db;