import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME as string,
  process.env.MYSQL_DB_USER as string,
  process.env.MYSQL_DB_PASSWORD as string,
  {
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_DB_PORT || '3306'),
    logging: false,
  }
);

export default sequelize;
