import pg from 'pg';
import { Sequelize } from 'sequelize';
import { DB_URL } from './environment';
import { SubscriptionType } from '../models/subscriptiontype.model';
import { CreditCard } from '../models/creditcard.model';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';
import { Guest } from '../models/event.model';
import { Invitation } from '../models/invitation.model';

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

  private constructor() { }

  public static getInstance(): PostgreDB {
    if (!PostgreDB.instance) {
      PostgreDB.instance = new PostgreDB();
      PostgreDB.instance.connect();
    }
    return PostgreDB.instance;
  }

  private async connect(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Conected to PostgreSQL with Sequelize');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }

  public async sync(): Promise<void> {
    try {
      await sequelize.sync({ alter: true });
    } catch (err) {
      console.error('Unable to sync the database:', err);
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
    }
  }

}


