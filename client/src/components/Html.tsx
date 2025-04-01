import React,{useState,useEffect} from 'react'
import MovieCard from './Moviecard';
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
  
  useEffect(() => {
      fetchRandomMovies();
  }, []);

  const fetchRandomMovies = async () => {
      const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
      const data = await response.json();
      const randomMovies = data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const moviesWithReviews: Movie[] = await Promise.all(randomMovies.map(async (movie: any) => {
          const reviews = await fetchMovieReviews(movie.id);
          return { ...movie, reviews };
      }));
      
      setMovies(moviesWithReviews);
  };

  const fetchMovieReviews = async (movieId: number): Promise<string[]> => {
      const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}&language=en-US`);
      const data = await response.json();
      return data.results.map((review: any) => review.content).slice(0, 3);
  };

  const addComment = (movieId: number, comment: string, setComments: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (!comment.trim()) return;
      setComments(prevComments => [...prevComments, comment]);
  };

  return (
      <div>
          <h1>Random Movies</h1>
          <button onClick={fetchRandomMovies}>Show Random Movies</button>
          <div className="movies-container">
              {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} addComment={addComment} />
              ))}
          </div>
      </div>
  );
};

export default MovieApp;