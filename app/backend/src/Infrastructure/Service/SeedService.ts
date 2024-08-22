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
    await this.createBoxTable();
    console.log('Table boxes created successfully');
    await this.createDecorationTable();
    console.log('Table decorations created successfully');
    await this.createColorTable();
    console.log('Table colors created successfully');
    await this.createBoxDecorationTable();
    console.log('Table box_decorations created successfully');
    await this.createBoxColorTable();
    console.log('Table box_colors created successfully');
    await this.createAddressTable();
    console.log('Table address created successfully');
    await this.createProfileTable();
    console.log('Table profile created successfully');
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

  async createBoxTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS boxes(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                image_url VARCHAR(255),
                price BIGINT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT boxes_price_check CHECK(price > 0)
            )
        `;
    await this.dbConnection.query(query);
  }

  async createDecorationTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS decorations(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT decorations_name_unique UNIQUE(name)
            )
        `;
    await this.dbConnection.query(query);
  }

  async createColorTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS colors(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT colors_name_unique UNIQUE(name)
            )
        `;
    await this.dbConnection.query(query);
  }

  async createBoxDecorationTable() {
    const query = `
            CREATE TABLE IF NOT EXISTS box_decorations(
                box_id VARCHAR(255) PRIMARY KEY,
                decoration_id VARCHAR(255),
                CONSTRAINT box_decorations_box_id_fk FOREIGN KEY(box_id) REFERENCES boxes(id),
                CONSTRAINT box_decorations_decoration_id_fk FOREIGN KEY(decoration_id) REFERENCES decorations(id),
                CONSTRAINT box_decorations_unique UNIQUE(box_id, decoration_id)
            )
      `;
    await this.dbConnection.query(query);
  }

  async createBoxColorTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS box_colors(
        box_id VARCHAR(255) PRIMARY KEY,
        color_id VARCHAR(255),
        CONSTRAINT box_colors_box_id_fk FOREIGN KEY(box_id) REFERENCES boxes(id),
        CONSTRAINT box_colors_color_id_fk FOREIGN KEY(color_id) REFERENCES colors(id),
        CONSTRAINT box_colors_unique UNIQUE(box_id, color_id)
      )
    `;
    await this.dbConnection.query(query);
  }

  async createProfileTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS profiles(
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255),
        full_name VARCHAR(255),
        phone_number VARCHAR(255),
        avatar VARCHAR(255),
        address_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT profiles_user_id_fk FOREIGN KEY(user_id) REFERENCES users(id),
        CONSTRAINT profiles_address_id_fk FOREIGN KEY(address_id) REFERENCES addresses(id),
        CONSTRAINT profiles_user_id_unique UNIQUE(user_id)
      );
    `;
    await this.dbConnection.query(query);
  }

  async createAddressTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS addresses(
        id VARCHAR(255) PRIMARY KEY,
        city VARCHAR(255),
        postal_code VARCHAR(10),
        street VARCHAR(255),
        details VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await this.dbConnection.query(query);
  }
}
