const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/sqlConnection');

const User = sequelize.define('user', {

  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      minLength(value) {
        if (String(value).length <= 6) {
          throw new Error("Password length should be greater than 6.");
        }
      }
    }
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  }

});

module.exports = User;