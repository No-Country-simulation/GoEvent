import mongoose from 'mongoose';
import { DB_URL } from './environment';

class MongoDB {
  private static instance: MongoDB | null = null;

  private constructor() { }

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
      MongoDB.instance.connect();
    }
    return MongoDB.instance;
  }

  private async connect(): Promise<void> {
    try {
      await mongoose.connect(DB_URL);
      console.log('Connected to MongoDB with Mongoose');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }

  public async isConnected(): Promise<boolean> {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(DB_URL);
      console.log('Reconnected to MongoDB with Mongoose');
    }
    return mongoose.connection.readyState === 1;
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      MongoDB.instance = null;
      console.log('Connection to MongoDB closed');
    } catch (err) {
      console.error('Error closing the connection:', err);
    }
  }

}

export default MongoDB
