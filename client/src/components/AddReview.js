import React, { useState } from 'react';
import axios from 'axios';
const AddReview = ({ apiUrl = 'http://localhost:3001/reviews' }) => {
    // Local state for form fields
    const [movie, setMovie] = useState('');
    const [review, setReview] = useState('');
    const [currentRating, setCurrentRating] = useState('');
    const [criticRating, setCriticRating] = useState('');
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a payload that matches your backend model
        const newReviewData = {
            movie,
            review,
            currentRating: Number(currentRating),
            criticRating: Number(criticRating),
        };
        try {
            // Example using Axios; adjust the endpoint & payload as needed
            const response = await axios.post(apiUrl, newReviewData);
            console.log('Review created:', response.data);
            // Reset form fields after successful submission
            setMovie('');
            setReview('');
            setCurrentRating('');
            setCriticRating('');
        }
        catch (error) {
            console.error('Error creating review:', error);
        }
    };
    return (<div style={styles.container}>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Movie:
          <input type="text" value={movie} onChange={(e) => setMovie(e.target.value)} style={styles.input}/>
        </label>


        <label style={styles.label}>
          Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)} style={styles.textarea}/>
        </label>

        <label style={styles.label}>
          Community Rating:
          <input type="number" value={currentRating} onChange={(e) => setCurrentRating(e.target.value)} style={styles.input}/>
        </label>

        <label style={styles.label}>
          Critic Rating:
          <input type="number" value={criticRating} onChange={(e) => setCriticRating(e.target.value)} style={styles.input}/>
        </label>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>);
};
