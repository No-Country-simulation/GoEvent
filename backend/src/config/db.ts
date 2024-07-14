import pg from 'pg';
import { Sequelize } from 'sequelize';
import { DB_URL } from './environment';
import { defineAssociations } from '../models';

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default class PostgreDB {
  private static instance: PostgreDB | null = null;


  public static async getInstance(): Promise<PostgreDB> {
    if (!PostgreDB.instance) {
      PostgreDB.instance = new PostgreDB();
      await PostgreDB.instance.connect();
      defineAssociations();
    }
    return PostgreDB.instance;
  }


  private async connect(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Conected to PostgreSQL with Sequelize');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      throw err;
    }
  }

  public async sync(): Promise<void> {
    try {
      await sequelize.sync({ alter: false });
      console.log('Database synchronized successfully.');
    } catch (err) {
      console.error('Unable to sync the database:', err);
      throw err;
    }
  }

  public async isConnected(): Promise<boolean> {
    try {
      await sequelize.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  public async close(): Promise<void> {
    try {
      await sequelize.close();
      PostgreDB.instance = null;
      console.log('Connection to PostgreSQL closed');
    } catch (err) {
      console.error('Error closing the connection:', err);
      throw err;
    }
  }
}