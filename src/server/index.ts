import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import firebase from 'firebase';

import { environments as ENV } from '@env/environments';
import authRoutes from '@modules/auth/routes';

export default class Server {

  public static _instance: Server;
  private app: express.Application;
  private port: number;

  constructor() {
    this.port = Number(process.env.PORT) || 3000;

    this.app = express();
  }

  // ROUTES
  public configRoutes(): void {
    this.app.use('/auth', authRoutes);
  }

  // CONFIGURATIONS
  public configServer(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use(cors({ origin: true, credentials: true }));
    this.configFirebase();
  }

  private configFirebase(): void {
    firebase.initializeApp(ENV.firebase);
  }

  // ERROR HANDLERS
  public handleErrors(): void {
    this.handle404();
    this.handle500();
  }

  private handle404(): void {
    this.app.use(function(req: Request, res: Response) {
      res.status(404);
      res.redirect('/auth');
    });
  }

  private handle500(): void {
    this.app.use(function(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
      console.log(error);
      res.status(500);
      res.json(error);
    });
  }

  //INIT SERVER
  public init(): void {
    this.app.listen(this.port, () => console.log(`Run in port ${this.port}`));
  }

  public static get instance(): Server {
    return this._instance || (this._instance = new this());
  }

}