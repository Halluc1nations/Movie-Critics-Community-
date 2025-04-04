import React, { useState, useEffect } from "react";
import axios from "axios";

interface Review {
  id: number;
  movie: string;
  review: string;
  currentRating: number;
  criticRating: number;
}



const AddReview: React.FC = () => {
  const [movie, setMovie] = useState("");
  const [review, setReview] = useState("");
  const [currentRating, setCurrentRating] = useState("");
  const [criticRating, setCriticRating] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Fetch reviews on page load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(apiUrl);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReviewData = {
      movie,
      review,
      currentRating: Number(currentRating),
      criticRating: Number(criticRating),
    };

    try {
      const response = await axios.post(apiUrl, newReviewData);
      setReviews([...reviews, response.data]);
      setMovie("");
      setReview("");
      setCurrentRating("");
      setCriticRating("");
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setReviews(reviews.filter((rev) => rev.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Handle edit
  const handleEdit = (id: number, currentReview: string) => {
    setEditingReviewId(id);
    setEditText(currentReview);
  };

  // Handle update
  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`${apiUrl}/${id}`, { review: editText });
      setReviews(
        reviews.map((rev) =>
          rev.id === id ? { ...rev, review: editText } : rev,
        ),
      );
      setEditingReviewId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Movie:
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          Community Rating:
          <input
            type="number"
            value={currentRating}
            onChange={(e) => setCurrentRating(e.target.value)}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Critic Rating:
          <input
            type="number"
            value={criticRating}
            onChange={(e) => setCriticRating(e.target.value)}
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <h2>Reviews</h2>
      {reviews.length === 0 ? <p>No reviews available.</p> : null}
      {reviews.map((rev) => (
        <div key={rev.id} style={styles.reviewBox}>
          <p>
            <strong>{rev.movie}</strong>
          </p>
          {editingReviewId === rev.id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={styles.textarea}
              />
              <button
                onClick={() => handleUpdate(rev.id)}
                style={styles.updateButton}
              >
                Update
              </button>
            </>
          ) : (
            <>
              <p>{rev.review}</p>
              <p>⭐ {rev.currentRating} / 10</p>
              <p>🎬 Critic Rating: {rev.criticRating} / 10</p>
              <button
                onClick={() => handleEdit(rev.id, rev.review)}
                style={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(rev.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// Styles
const styles = {
  container: { padding: "20px", maxWidth: "600px", margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontWeight: "bold" },
  input: { padding: "8px", fontSize: "16px", width: "100%" },
  textarea: {
    padding: "8px",
    fontSize: "16px",
    width: "100%",
    height: "100px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  reviewBox: {
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  editButton: {
    padding: "5px",
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  updateButton: {
    padding: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    padding: "5px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default AddReview;
