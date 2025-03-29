import express from 'express';
import type { Request, Response } from 'express';
import { Profile } from '../models/index.js';

const router = express.Router();

// GET /profiles - Get all profiles
router.get('/', async (_req: Request, res: Response) => {
  // TODO: Update code to return all Profiles
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /profiles/:id - Get a profile by ID
router.get('/:id', async (req: Request, res: Response) => {
  // TODO: Update code to return one Profile based on ID
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /profiles - Create a new profile
router.post('/', async (req: Request, res: Response) => {
  // TODO: Update code to create a Profile
  const { id, name, email, password, role } = req.body;
  try {
    const newProfile = await Profile.create({ id, name, email, password, role });
    res.status(201).json(newProfile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /profiles/:id - Update a profile by ID
router.put('/:id', async (req: Request, res: Response) => {
  // TODO: Update code to retrieve one Profile based on id and return an updated Profile object
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const profile = await Profile.findByPk(id);
    if (profile) {
      Profile.name = name;
      Profile.email = email;
      Profile.password = password;
      Profile.role = role;
      await Profile.save();
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /profiles/:id - Delete a profiles by ID
router.delete('/:id', async (req: Request, res: Response) => {
  // TODO: Update code to delete Profile based on ID
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (profile) {
      await profile.destroy();
      res.json({ message: 'Profile deleted' });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

});

export { router as profileRouter };
