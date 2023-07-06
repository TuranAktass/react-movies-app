import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie]: any = React.useState(null);

  let fetchDetails = async () => {
    try {
      const response = await Axios.get(
        `https://www.omdbapi.com/?apikey=cebce6&i=${id}`
      ).then((response) => {
        const data = response.data;

        setMovie(data);
      });
    } catch {
      console.log("error");
    }
  };

  fetchDetails();

  return (
    <div>
      {movie != null ? (
        <div>
          <h1>{movie.Title}</h1>
          <h2>{movie.Year}</h2>
          <img src={movie.Poster} alt="movie poster" />
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
