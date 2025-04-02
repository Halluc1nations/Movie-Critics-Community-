import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
const blacklist = new Set<string>();

/**
 * Adds a token to the blacklist.
 * @param token - The JWT token to blacklist.
 */
export const addToBlacklist = (token: string) => {
  blacklist.add(token);
};

/**
 * Checks if a token is blacklisted.
 * @param token - The JWT token to check.
 * @returns True if the token is blacklisted, false otherwise.
 */
export const isBlacklisted = (token: string): boolean => {
  return blacklist.has(token);
};
