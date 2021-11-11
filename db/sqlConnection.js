require('dotenv').config();
const pg = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE_URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;