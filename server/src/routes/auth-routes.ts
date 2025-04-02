import { Router, type Request, type Response } from 'express';
import { Profile } from '../models/Profile.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { email, password, } = req.body;

  const profile = await Profile.findOne({
    where: { email },
  });
  if (!profile) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, profile.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Profile.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Profile.create({
      name,
      email,
      password: hashedPassword,
      role: 'user', // Set default role to 'user'
    });

    return res.status(201).json({ message: 'User created successfully', userId: newUser.id });

  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal server error' });

  }
}


const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.post('/signup', signup);


export default router;
