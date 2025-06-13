import { DataSource } from 'typeorm';
import logger from '../utils/logger';
import * as Entities from '../entities';
import { CONFIG } from './config';

type Environment = 'LOCAL' | 'DEVELOPMENT' | 'PRODUCTION';

// Get the environment variable and provide a default
const environment: Environment =
  (process.env.NODE_ENV as Environment) || 'LOCAL';

const databaseConfig: any = CONFIG[environment];

let mySQl_dataSource: DataSource | null = null;

const connectDB = async () => {
  try {
    if (!databaseConfig) {
      throw new Error(
        'Database configuration not found. Check your config file.',
      );
    }

    // Log database connection attempt with journeyId
    logger.info(`['Unknown'}] Attempting to connect to MySQL...`);

    mySQl_dataSource = new DataSource({
      type: 'mysql',
      driver: require('mysql2'),
      host: databaseConfig.host,
      port: 3306,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [...Object.values(Entities)],
      synchronize: false, // Use synchronize: true only in development, to auto-create database schema
      ssl: {
        rejectUnauthorized: false, // for self-signed certs; use true in production
      },
      extra: {
        connectionLimit: 10,
      },
      logging: true,
    });

    // Initialize the connection
    await mySQl_dataSource.initialize();
    console.log('MySQL connected successfully');

    // Log successful connection with journeyId
    logger.info(`MySQL connected`);
    return mySQl_dataSource;
  } catch (err) {
    console.log(err);
    // Log connection error with journeyId
    logger.error(`MySQL connection error: ${(err as Error).message}`);
    process.exit(1); // Exit process on connection error
  }
};

const getDataSource = () => {
  if (!mySQl_dataSource) {
    throw new Error('DataSource is not initialized. Call connectDB first.');
  }
  return mySQl_dataSource;
};

export { connectDB, getDataSource };
