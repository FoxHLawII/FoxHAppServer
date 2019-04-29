import { Session } from "../entities/session";

class SessionStore {

  private sessions: Session[] = [];
  constructor() {}

  public addSession(session: Session): void {
    !!session ? this.sessions.push(session) : null;
  }

  public removeSession(sessionId: string): void {
    this.sessions = this.sessions.filter(session => session.sessionId === sessionId);
  }

  public getSession(sessionId: string): Session {
    return this.sessions.find(session => session.sessionId === sessionId);
  }

  public getSessions(): any {
    return this.sessions;
  }
}

export default new SessionStore();