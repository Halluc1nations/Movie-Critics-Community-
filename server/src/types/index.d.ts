import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session?: Session & Partial<SessionData>;
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      username: string;
    };
  }
}