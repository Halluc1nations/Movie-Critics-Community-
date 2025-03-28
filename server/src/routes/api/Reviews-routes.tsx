import express from 'express';
import sequelize from 'sequelize';
import Movie from './models/Movie';
import Review from './models/Review';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// -----------------------------

// Add a favorite movie 
app.post('/favorites', async (req, res) => {
  try {
    const { title, posterPath, overview, imdbId } = req.body;
    const movie = await Movie.create({ title, posterPath, overview, imdbId });
    res.json(movie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Error adding movie' });
  }
});

// Fetch all favorite movies
app.get('/favorites', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

// -----------------------------
// New endpoints for Reviews (Comments/Community Reviews)
// -----------------------------

// Create a new review
app.post('/reviews', async (req, res) => {
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

// Retrieve all reviews for a specific movie
app.get('/reviews', async (req, res) => {
  try {
    // Expect movieId as a query parameter, e.g., /reviews?movieId=123
    const { movieId } = req.query;
    if (!movieId) {
      return res.status(400).json({ error: 'movieId query parameter is required' });
    }
    const reviews = await Review.findAll({ where: { movieId } });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Update an existing review by ID
app.put('/reviews/:id', async (req, res) => {
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
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Error updating review' });
  }
});

// Delete a review by ID
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.destroy();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Error deleting review' });
  }
});

// -----------------------------
// Sync the database and start the server
// -----------------------------
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
