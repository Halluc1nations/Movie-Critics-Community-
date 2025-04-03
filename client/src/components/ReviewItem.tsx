import { useState } from "react";
import axios from "axios";
import { IReview } from "../interfaces/review.js";



export default function ReviewItem({ review }: { review: IReview }) {
  const [comment, setComment] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const updateComment = async () => {
    try {
      const response = await axios.put(
        `/api/reviews/${review.id}`,
        { comment },
      );
      if (response) {
        const { data } = response;
        console.log(data);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `/api/reviews/${review.id}`,
      );
      if (response) {
        const { data } = response;
        console.log(data);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <div className="comment-item">
      {isEditing ? (
        <input
          type="text"
          placeholder="Edit your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      ) : (
        <p className="Comment-Text">💬 {review.comment}</p>
      )}
      <div className="update-comment">
        <button onClick={() => setisEditing(true)}>Edit</button>
        <button onClick={() => setisEditing(false)}>Cancel</button>
        <button onClick={() => updateComment()}>Update</button>
      </div>
      <div className="delete-comment">
        <button onClick={() => deleteComment()}>Delete</button>
      </div>
    </div>
  );
}
