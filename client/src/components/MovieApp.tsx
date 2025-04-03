import React, { useState, useEffect } from 'react';
import MovieCard from './Moviecard';
import ReviewItem from './ReviewItem';

const TMDB_API_KEY = "f13519710f67ada8cb965769cf1e85ed"; // Replace with your TMDB API Key
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  reviews: string[];
}

const MovieApp: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {}, []);

  const fetchRandomMovies = async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    const randomMovies = data.results
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const moviesWithReviews: Movie[] = await Promise.all(
      randomMovies.map(async (movie: IUnknown) => {
        const reviews = await fetchMovieReviews(movie.id);
        return { ...movie, reviews };
      })
    );

    setMovies(moviesWithReviews);
  };

  interface IUnknown {
    [key: string]: unknown;
    id: number;
  }

  const fetchMovieReviews = async (movieId: number): Promise<string[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results.map((review: IUnknown) => review.content).slice(0, 3);
  };

  

  const handleUpdateReview = async (movieId: number, reviewId: number, updatedContent: string) => {
    // Example PUT request to update a review
    const response = await fetch(`/api/movies/${movieId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent }),
    });

    if (response.ok) {
      console.log('Review updated successfully');
      // Optionally, refresh the reviews
      const updatedMovies = await fetchMovieReviews(movieId);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, reviews: updatedMovies } : movie
        )
      );
    }
  };

  const handleDeleteReview = async (movieId: number, reviewId: number) => {
    // Example DELETE request to delete a review
    const response = await fetch(`/api/movies/${movieId}/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Review deleted successfully');
      // Optionally, refresh the reviews
      const updatedMovies = await fetchMovieReviews(movieId);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, reviews: updatedMovies } : movie
        )
      );
    }
  };

  return (
    <div>
      <h1>Movie Recommendations</h1>
      <button onClick={fetchRandomMovies}>Generate Recommendations</button>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <div className="reviews-container">
              {movie.reviews.map((review, index) => (
                <ReviewItem
                  key={index}
                  review={review}
                  onUpdate={(updatedContent: string) =>
                    handleUpdateReview(movie.id, index, updatedContent)
                  }
                  onDelete={() => handleDeleteReview(movie.id, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default MovieApp;