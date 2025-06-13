import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import { connectDB } from './config/database';

dotenv.config();

/* ROUTES */
import { authRoute } from './routes/index';

/* APP */
const app = express();
app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authRoute);

/* mySql connection */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    logger.error(`Failed to connect to MysqlDB: ${error.message}`);
    process.exit(1);
  });
