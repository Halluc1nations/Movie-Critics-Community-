export interface IReview {
  id: number;
  username: string;
  comment: string;
  rating: number;
  movieId: number;
  thumbsUp: number;
  thumbsDown: number;
}
