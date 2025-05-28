// app/sequelize/sequelize.ts
import { Sequelize } from 'sequelize';
import logger from '../utils/utils.logger';

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

// Optional: log only successful or failed connection
sequelize.authenticate()
  .then(() => {
    logger.info('✅ Database connection has been established successfully.');
  })
  .catch((error) => {
    logger.error('❌ Unable to connect to the database:', error);
  });

export default sequelize;
