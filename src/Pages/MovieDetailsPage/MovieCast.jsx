import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { Link } from "react-router-dom";
const MovieCast = ({ mediaType, movieId }) => {
  const MOVIE_CREDITS_URL = `https://api.themoviedb.org/3/${mediaType}/${parseInt(
    movieId
  )}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
  const [movieCredits, setMovieCredits] = useState([]);
  useEffect(() => {
    fetch(MOVIE_CREDITS_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovieCredits(data.cast.slice(0, 8));
      });
  }, [movieId]);

  return (
    <>
      {movieCredits.length > 0 &&
        movieCredits?.map((actor) => {
          const actorImg = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
          return (
            <Link key={actor.id} to={`/actor/${actor.id}`}>
              <div className="actor-movies__div">
                <img
                  src={
                    actor.profile_path
                      ? actorImg
                      : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2T5824oNgrzQEYWeOimkakYqM4KawtUGpX4mhwhbWcmj8vwz6"
                  }
                />
                <p>{actor.name}</p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default MovieCast;
