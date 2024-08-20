import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './Infrastructure/Http/Express/v1/Router/UserRouter';
dotenv.config();

import { MysqlConnection } from './Infrastructure/DB/MysqlConnection';
import { ConfigService } from './Infrastructure/Service/ConfigService';
import { SeedService } from './Infrastructure/Service/SeedService';
import { createPool } from 'mysql2/promise';

const mysqlConnection = MysqlConnection.getInstance(
  ConfigService.getInstance()
);
const seedService = new SeedService(mysqlConnection.getPool());

const init = async () => {
  const swaggerDocument =
    process.env.NODE_ENV === 'production'
      ? require('./swagger.json')
      : require('../swagger.json');
  const port =
    process.env.NODE_ENV === 'production' ? 5000 : +process.env.PORT!;
  console.log({ port });
  await seedService.initDB();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/user', userRouter);

  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () => console.log(`Server started on port ${port}`));
};
init();
