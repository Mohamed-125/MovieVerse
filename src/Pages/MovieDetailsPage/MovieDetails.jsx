import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { similarContext } from "../../App";
import MovieCast from "./MovieCast";
import "./MovieDetails.css";
import MovieInfo from "./MovieInfo";
import Section from "../../Components/Section/Section";
import MovieGenres from "./MovieGenres";
import MovieVideos from "./MovieVideos";
const MovieDetails = ({ setMovieId, mediaType }) => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const [similar, LoadMoreSimilar] = useContext(similarContext);
  const ref = useRef();

  useEffect(() => {
    ref.current.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movieData?.backdrop_path})`;
  }, [movieData]);

  const MOVIE_URL = `https://api.themoviedb.org/3/${mediaType}/${parseInt(
    movieId
  )}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  useEffect(() => {
    // dynamic movie url when the id change

    fetch(MOVIE_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
      });
  }, [movieId]);

  // setThe movie id to start fetching the similar movies

  useEffect(() => {
    setMovieId(movieId);
  }, [movieId]);

  const img = `https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`;

  return (
    <>
      <div className="bg " ref={ref}></div>
      <div className="section__padding">
        <div className="movieDetails ">
          <img className="movieDetails__posterImg" src={img} />

          <div className="movieDatails__text">
            <MovieGenres movieData={movieData} />
            <div>
              <h2> {movieData.name || movieData.title}</h2>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(10px , 5vw , 15px)",
                }}
              >
                {movieData.tagline}
              </p>
              <p>{movieData.overview}</p>
            </div>
            <div
              style={{ gridTemplateColumns: " repeat(auto-fit, 140px)" }}
              className="movieDetails__cast-movies_divs_contener"
            >
              {/* moive cast component  */}

              <MovieCast
                mediaType={mediaType}
                movieData={movieData}
                movieId={movieId}
              />
            </div>
            <MovieInfo mediaType={mediaType} movieData={movieData} />
          </div>
        </div>

        {/* moive videos component  */}

        <MovieVideos movieId={movieId} mediaType={mediaType} />

        <div style={{ paddingTop: "5rem" }}>
          {/* similar section  */}
          <Section
            mediaType={mediaType}
            title="similar"
            LinkName="similar"
            type={similar}
            loadMore={LoadMoreSimilar}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
