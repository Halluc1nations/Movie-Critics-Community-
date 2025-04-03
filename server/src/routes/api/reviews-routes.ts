import express from 'express';
import {Movies} from '../../models/Movies.js';
import  {Review} from '../../models/Review.js';
import type { Request, Response } from 'express';
import type { WhereAttributeHashValue } from 'sequelize/types/model';


const router = express();
// -----------------------------
// Add a favorite movie
router.post('/favorites', async (req, res) => {
  try {
    const { title, posterPath, overview, imdbId } = req.body;
    const movie = await Movies.create({ title, posterPath, overview, imdbId });
    res.json(movie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Error adding movie' });
  }
});
// Fetch all favorite movies
// router.get('/favorites', async (_req, res) => {
//   try {
//     const movies = await Movies.findAll({
//       where: {
//         isFavorite: true,
//       },
//     });
//     res.json(movies);
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     res.status(500).json({ error: 'Error fetching movies' });
//   }
// });
// -----------------------------
// New endpoints for Reviews (Comments/Community Reviews)
// -----------------------------
// Create a new review
router.post('/reviews', async (req, res) => {
  try {
    const { username, comment, rating, movieId } = req.body;
    // Optionally, you can add validation to ensure the movie exists
    const review = await Review.create({ username, comment, rating, movieId });
    res.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Error creating review' });
  }
});

router.post('/:movieId', async (req, res) => {
 const  movieId  = parseInt( req.params.movieId);
  const { comment } = req.body;
  // @ts-ignore
const username = req?.user?.username || "JollyGuru"; // Replace with actual username logic
 


  if (!comment) {
      return res.status(400).json({ message: "Review content is required" });
  }

  try {
      const movie = await Movies.findByPk(movieId); // Assuming you use Sequelize
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      const review = await Review.create({ movieId, comment, username });
      return res.status(201).json(review);
  } catch (error) {
      console.error("Error saving review:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve all reviews for a specific movie
router.get('/reviews', async (req: Request, res: Response) => {
  try {
    // Expect movieId as a query parameter, e.g., /reviews?movieId=123
    const { movieId } = req.query;
    if (!movieId) {
      return res.status(400).json({ error: 'movieId query parameter is required' });
    }
    const reviews = await Review.findAll({ where: { movieId: movieId as WhereAttributeHashValue<number> } });
    return res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ error: 'Error fetching reviews' });
  }
});
// Update an existing review by ID
router.put('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, comment, rating } = req.body;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.username = username ?? review.username;
    review.comment = comment ?? review.comment;
    review.rating = rating !== undefined ? rating : review.rating;
    await review.save();
    return res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({ error: 'Error updating review' });
  }
});
// Delete a review by ID
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.destroy();
    return res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ error: 'Error deleting review' });
  }
});

// Increment thumbs-up for a review
router.post('/reviews/:id/thumbs-up', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.thumbsUp = (review.thumbsUp || 0) + 1;
    await review.save();
    return res.json(review);
  } catch (error) {
    console.error('Error incrementing thumbs-up:', error);
    return res.status(500).json({ error: 'Error incrementing thumbs-up' });
  }
});
// Increment thumbs-down for a review
router.post('/reviews/:id/thumbs-down', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.thumbsDown = (review.thumbsDown || 0) + 1;
    await review.save();
    return res.json(review);
  } catch (error) {
    console.error('Error incrementing thumbs-down:', error);
    return res.status(500).json({ error: 'Error incrementing thumbs-down' });
  }
});

export{router as reviewRouter};
