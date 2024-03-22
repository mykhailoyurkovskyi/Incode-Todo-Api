import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.DB_URI || 'null';
const database = process.env.DB_NAME || 'null';
const dbUserName = process.env.DB_USERNAME || 'null';
const dbPassword = process.env.DB_PASSWORD || 'null';

const dbInit = (): any => {
  return new Sequelize(database, dbUserName, dbPassword, {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '/models'],
    dialectOptions: {
      ssl: true,
    },
  });
};

module.exports = dbInit;
