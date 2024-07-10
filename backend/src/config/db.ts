import { Sequelize } from 'sequelize';
import { DB_URL } from './environment';
import { SubscriptionType } from '../models/subscriptiontype.model';
import { CreditCard } from '../models/creditcard.model';
import { User } from '../models/user.model';

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
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
      await sequelize.sync({ alter: true });
      console.log('Conected to PostgreSQL with Sequelize');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
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
      console.log('Connection to MongoDB closed');
    } catch (err) {
      console.error('Error closing the connection:', err);
    }
  }

}


