import dotenv from 'dotenv';
dotenv.config();

import { MysqlConnection } from './Infrastructure/DB/MysqlConnection';
import { ConfigService } from './Infrastructure/Service/ConfigService';
import { SeedService } from './Infrastructure/Service/SeedService';
import app from './app';

const configService = ConfigService.getInstance();
const mysqlConnection = MysqlConnection.getInstance(configService);
const seedService = new SeedService(mysqlConnection.getPool());

const init = async () => {
  await seedService.initDB();
  const port =
    process.env.NODE_ENV === 'production'
      ? 5000
      : Number(configService.get('BE_PORT'));

  app.listen(port, () => console.log(`Server started on port ${port}`));
};
init();
