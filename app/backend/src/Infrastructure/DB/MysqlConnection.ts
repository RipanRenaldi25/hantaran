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
      host: this.configService.get('MYSQL_HOST') || 'localhost',
      user: this.configService.get('MYSQL_USER') || 'root',
      password: this.configService.get('MYSQL_ROOT_PASSWORD') || 'root',
      database: this.configService.get('MYSQL_DB') || 'hantaran',
    });

    this.checkConnection().then(conn => console.log(conn)).catch(err => console.log(err));

    return MysqlConnection.pool;
  }

  async checkConnection() {
    try{
      const conn = await this.getPool().getConnection();
      await conn.ping();
      conn.release();
      console.log("Database connection successful");
    }catch(err) {
      console.log("Database connection failed");
      console.log(err);
    }
  }
}
