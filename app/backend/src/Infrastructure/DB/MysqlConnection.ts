import { createPool, Pool } from 'mysql2/promise';
import { IConfigService } from '../../Application/Service';

export class MysqlConnection {
  private readonly configService: IConfigService;
  private static pool: Pool | null = null;
  private static instance: MysqlConnection | null = null;
  private constructor(configService: IConfigService) {
    this.configService = configService;
  }

  static getInstance(configService: IConfigService) {
    if (!MysqlConnection.instance) {
      MysqlConnection.instance = new MysqlConnection(configService);
    }
    return MysqlConnection.instance;
  }

  getPool() {
    if (!!MysqlConnection.pool) {
      return MysqlConnection.pool;
    }
    console.log(this.configService.get('MYSQL_HOST'));
    console.log(process.env.MYSQL_HOST);
    MysqlConnection.pool = createPool({
      host: this.configService.get('MYSQL_HOST') || 'localhost',
      user: this.configService.get('MYSQL_USER') || 'root',
      password: this.configService.get('MYSQL_ROOT_PASSWORD') || 'root',
      database: this.configService.get('MYSQL_DB') || 'hantaran',
    });
    return MysqlConnection.pool;
  }
}
