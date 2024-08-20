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
    MysqlConnection.pool = createPool({
      host: 'mysql' || this.configService.get('MYSQL_HOST'),
      user: this.configService.get('MYSQL_USER'),
      password: this.configService.get('MYSQL_ROOT_PASSWORD'),
      database: this.configService.get('MYSQL_DB'),
    });
    return MysqlConnection.pool;
  }
}
