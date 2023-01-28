const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      CategoryId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Major: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      Category: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize : sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Category',
      tableName: 'categories',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Category.hasMany(db.Notice);
    db.Category.hasMany(db.Subscription);
  }
};
