const Sequelize = require('sequelize');
const sequelizeInstance = require('./index');

module.exports = class Subscription extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      SubscriptionId : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey : true
      }
    },
    {
      sequelize : sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Subscription',//javascript
      tableName: 'subscriptions',//sql
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Subscription.belongsTo(db.User);
    db.Subscription.belongsTo(db.Category);
  }
};
