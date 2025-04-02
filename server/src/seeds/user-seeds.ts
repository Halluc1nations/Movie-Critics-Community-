import { Profile } from '../models/Profile.js';

export const seedUsers = async () => {
  await Profile.bulkCreate(
    [
      { name: 'JollyGuru', email: 'jolly@guru.com', password: 'password', role: 'Boss' },
      {
        name: 'SunnyScribe',
        email: 'sunny@scribe.com',
        password: 'password',
        role: 'Writer',
      },
      {
        name: 'RadiantComet',
        email: 'radiant@comet.com',
        password: 'password',
        role: 'Writer',
      },
    ],
    { individualHooks: true }
  );
};
