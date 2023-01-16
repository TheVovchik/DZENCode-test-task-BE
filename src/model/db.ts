import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line max-len
export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    ssl: { "rejectUnauthorized": false }
  }
});
