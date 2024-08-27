import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// ROUTER
import userRouter from './Infrastructure/Http/Express/v1/Router/UserRouter';
import boxRouter from './Infrastructure/Http/Express/v1/Router/BoxRouter';

import { MysqlConnection } from './Infrastructure/DB/MysqlConnection';
import { ConfigService } from './Infrastructure/Service/ConfigService';
import { SeedService } from './Infrastructure/Service/SeedService';
import colorRouter from './Infrastructure/Http/Express/v1/Router/ColorRouter';
import decorationRouter from './Infrastructure/Http/Express/v1/Router/DecorationRouter';
import profileRouter from './Infrastructure/Http/Express/v1/Router/ProfileRouter';
import cartRouter from './Infrastructure/Http/Express/v1/Router/CartRouter';
import orderRouter from './Infrastructure/Http/Express/v1/Router/OrderRouter';

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
  await seedService.initDB();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/public', express.static('uploads'));
  app.use('/users', userRouter);
  app.use('/boxes', boxRouter);
  app.use('/colors', colorRouter);
  app.use('/decorations', decorationRouter);
  app.use('/profiles', profileRouter);
  app.use('/carts', cartRouter);
  app.use('/orders', orderRouter);
  app.get('/', (req, res) => res.send('ok2'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () => console.log(`Server started on port ${port}`));
};
init();
