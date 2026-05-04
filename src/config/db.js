require('dotenv').config();
const {Sequelize}=require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,     // database name
  process.env.DB_USER,     // user
  process.env.DB_PASS,     // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
);

module.exports = {sequelize};