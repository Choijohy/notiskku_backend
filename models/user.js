const Sequelize = require('sequelize');


module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      UserId : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      StudentId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
      },
      UserName: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      Major1: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      Major2: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      Major3: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      Email : {
        type: Sequelize.STRING(40),
        allowNull:false,
      },
      AppNoticeOn : {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      Provider : {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'kakao',
      },
      SnsId: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      RefreshToken : {
        type: Sequelize.STRING(200),
        allowNull :false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Subscription);
  }
};
