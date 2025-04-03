import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import { IReview } from "../interfaces/review";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  reviews: string[];
}
interface MovieCardProps {
  movie: Movie;
}
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<IReview[]>(
          `http://localhost:3001/api/reviews/`,
          {
            params: {
              movieId: movie.id,
            },
          },
        );
        if (response) {
          const { data } = response;
          console.log(data);
          setReviews(data);
        }
      } catch (error) {
        console.error("Error getting reviews for movie:", error);
      }
    };
    fetchReviews();
  }, [movie.id]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post<IReview>(
        `http://localhost:3001/api/reviews/`,
        {
          movieId: movie.id,
          comment: comment,
        },
      );
      if (response) {
        const { data } = response;
        console.log(data);
        setReviews((prevReviews) => [...prevReviews, data]);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <article>
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
          <section className="comments-list">
            {reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </section>
          <ReviewForm movieId = {movie.id}/>
        </div> {/* close movie card */}
    
    </article>
  );
};

export default MovieCard;
