import sequelize from '../config/connection.js';
import { ProfileFactory } from './Profile.js';
import { ReviewFactory } from './Review.js';
import { MovieFactory } from './Movies.js';

const Profile = ProfileFactory(sequelize);

export { sequelize, Profile };
=======
import { ReviewFactory } from './Review.js';
import { MovieFactory } from './Movies.js';


const Profile = ProfileFactory(sequelize);
const Review = ReviewFactory(sequelize);
const Movies = MovieFactory(sequelize);

Movies.hasMany(Review, {
  foreignKey: 'movieId',
  onDelete: 'CASCADE',
});

Review.belongsTo(Movies, {
  foreignKey: 'movieId',
});

Movies.belongsTo(Profile, {
    foreignKey: 'profileId',
});

export { sequelize, Profile, Movies, Review };

