import { User } from "./user";

export class Session {

  constructor(
    public sessionId: string,
    public user: User,
    public token: string,
    public expirationTime: string
  ) { }

  public isValid(): boolean {
    const now = new Date();
    const expirationDate = new Date(this.expirationTime);
    return expirationDate > now;
  }
}