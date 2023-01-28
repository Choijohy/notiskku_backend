const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      NoticeId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      NoticeTitle: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      NoticeBody: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      NoticeUrl: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      NoticeDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      sequelize : sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Notice',
      tableName: 'notices',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Notice.belongsTo(db.Category);
  }
};
