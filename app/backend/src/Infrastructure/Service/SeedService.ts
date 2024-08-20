import { Pool } from 'mysql2/promise';

export class SeedService {
  private readonly dbConnection;
  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }

  async initDB() {
    console.log('Migrate DB');
    await this.createRoleTable();
    console.log('Role table created successfully');
    await this.createUserTable();
    console.log('Users table created successfully');
  }

  async createRoleTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS roles(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255)
            )
        `;
    await this.dbConnection.query(query);
  }
  async createUserTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS users(
                id VARCHAR(255) PRIMARY KEY,
                username VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                role VARCHAR(255),
                is_verified BOOLEAN DEFAULT false,
                created_at TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT users_email_unique UNIQUE(email),
                CONSTRAINT users_username_unique UNIQUE(username),
                CONSTRAINT users_role_fk FOREIGN KEY(role) REFERENCES roles(id)
            )
        `;
    await this.dbConnection.query(query);
  }
}
