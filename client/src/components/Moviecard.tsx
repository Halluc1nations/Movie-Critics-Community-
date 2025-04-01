import React,{useState} from 'react'
interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  reviews: string[];
}
interface MovieCardProps {
  movie: Movie;
  addComment: (movieId: number, comment: string, setComments: React.Dispatch<React.SetStateAction<string[]>>) => void;
}
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const MovieCard: React.FC<MovieCardProps> = ({ movie, addComment }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);


  return (
    <div>
      <div className="movie-card">
            <img src={`${TMDB_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <div className="reviews">
                <strong>Reviews:</strong>
                {movie.reviews.length > 0 ? (
                    movie.reviews.map((review, index) => <p key={index}>📝 {review}</p>)
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
            <div className="comment-box">
                <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => { addComment(movie.id, comment, setComments); setComment(""); }}>
                    Post
                </button>
                <div className="comments">
                    {comments.map((cmt, index) => <p key={index}>💬 {cmt}</p>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard