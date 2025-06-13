type Environment = 'LOCAL' | 'DEVELOPMENT' | 'PRODUCTION';

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

export const CONFIG: Record<Environment, DatabaseConfig> = {
  LOCAL: {
    username: process.env.USER_NAME as string,
    password: process.env.PASS as string,
    database: process.env.DB_NAME as string,
    host: process.env.HOST as string,
    dialect: 'mysql',
  },
  DEVELOPMENT: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: '',
  },
  PRODUCTION: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: '',
  },
};
