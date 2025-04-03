import { ProfilesData } from "./ProfilesData";

export interface ReviewsData {
  id: number | null;
  username: string | null;
  comment: string | null;
  rating: string | null;
  movieId: number | null;
  thumbsUp: number | null;
  thumbsDown: number | null;
}