// app/sequelize/sequelize.ts
import { Sequelize } from "sequelize";
import logger from "../utils/utils.logger";
import { get } from "./config";

const config = get(process.env.NODE_ENV);

export const sequelize = new Sequelize(
  config.database.DB_NAME,
  config.database.DB_USERNAME,
  config.database.DB_PASSWORD,
  {
    host: config.database.DB_HOST,
    dialect: config.database.DIALECT,
    logging: config.database.LOGGING,
  }
);

// const sequelize = new Sequelize(
//   process.env.MYSQL_DB_NAME as string,
//   process.env.MYSQL_DB_USER as string,
//   process.env.MYSQL_DB_PASSWORD as string,
//   {
//     host: process.env.MYSQL_DB_HOST,
//     dialect: 'mysql',
//     port: parseInt(process.env.MYSQL_DB_PORT || '3306'),
//     logging: false,
//   }
// );

// Optional: log only successful or failed connection
sequelize
  .authenticate()
  .then(() => {
    logger.info("✅ Database connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("❌ Unable to connect to the database:", error);
  });

export default sequelize;
