import React, { useEffect, useState } from "react";

const MovieVideos = ({ movieId, mediaType }) => {
  const [movieVideos, setMovieVideos] = useState([]);

  const MOVIE_URL_VIEDOES = `https://api.themoviedb.org/3/${mediaType}/${parseInt(
    movieId
  )}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  useEffect(() => {
    fetch(MOVIE_URL_VIEDOES)
      .then((res) => res.json())
      .then((data) => {
        setMovieVideos(data.results);
      });
  }, [movieId]);
  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        alignItems: "center",
      }}
      className="movieDetails__videos_contener"
    >
      {movieVideos
        .reverse()
        .slice(0, 5)
        ?.map((item) => {
          return (
            <>
              <p
                style={{
                  position: "relative",
                  top: "1rem",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </p>
              <iframe
                key={item.key}
                className="movieDetails__movieIframe"
                src={`https://youtube.com/embed/${item.key}`}
              />
            </>
          );
        })}
    </div>
  );
};

export default MovieVideos;
