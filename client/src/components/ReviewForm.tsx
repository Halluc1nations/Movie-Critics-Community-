import React, { useEffect, useState } from "react";


function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const movieId = e.currentTarget.elements['movie-id'].value;

  fetch(`/api/reviews/${movieId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: e.currentTarget.elements['new-review'].value,
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    });
};




const MovieCard: React.FC = (props: any ) => {
  const [reviewText, setReviewText] = useState("");

  return (
    <form onSubmit={handleSubmit}>
<label htmlFor="new-review">Leave a Review</label>
<textarea name="new-review" id="new-review" onChange={(e)=>{
  setReviewText(e.target.value);
  console.log(reviewText);
}}>{reviewText}</textarea>
    <input type="hidden" name="movie-id" value={props.movieId} />
   
<button type="submit">Submit</button>
    </form>
  )
};

export default MovieCard;
