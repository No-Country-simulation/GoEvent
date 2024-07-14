import express from 'express';
import cors from 'cors';
import { PORT, API_VERSION, CORS_ORIGIN } from './environment';
import PostgreDB from './db';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import guestRoutes from '../routes/guest.routes';

export default class Server {
  public app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.listen();
  }

  private database() {
    PostgreDB.getInstance();
  }

  private middlewares() {
    this.app.use(cors({ origin: CORS_ORIGIN }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(`/${API_VERSION}/auth`, authRoutes);
    this.app.use(`/${API_VERSION}/user`, userRoutes);
    
    this.app.use(`/${API_VERSION}/event/:vid/guest`, guestRoutes);
  }

  private listen() {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  public close() {
    this.server.close();
  }


}