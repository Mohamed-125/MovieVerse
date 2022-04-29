import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Actor.css";
import { Link } from "react-router-dom";
const Actor = () => {
  const { actorId } = useParams();
  const [actorData, setActorData] = useState([]);
  const [actorMoviesData, setActorMoviesData] = useState([]);
  const [actorTVData, setActorTVData] = useState([]);
  useEffect(() => {
    const ACTOR_DATA_URL = `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
    const ACTOR_MOVIES_URL = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
    const ACTOR_TV_URL = `https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
    fetch(ACTOR_DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setActorData(data);
      });

    fetch(ACTOR_MOVIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setActorMoviesData(data.cast);
      });
    fetch(ACTOR_TV_URL)
      .then((res) => res.json())
      .then((data) => {
        setActorTVData(data.cast);
      });
  }, [actorId]);
  return (
    <>
      <div className="actorDetails section__padding">
        <img
          className="actorDetails__actorImg"
          src={
            actorData.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actorData.profile_path}`
              : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2T5824oNgrzQEYWeOimkakYqM4KawtUGpX4mhwhbWcmj8vwz6"
          }
        />
        <div className="actorDatails__text">
          <h2> {actorData.name}</h2>
          <div className="actor__biography_div">
            <p>{actorData.biography}</p>
          </div>
          <h4>Actor Information</h4>
          <p>Birthday : {actorData.birthday}</p>
          {actorData.deathday && <p> Deathday : {actorData.deathday}</p>}
          <p>Place of birth : {actorData.place_of_birth}</p>
        </div>
      </div>
      <div className="movieDetails__cast-movies_divs_contener section__padding">
        {actorTVData.map((tvShow) => {
          return (
            <Link key={tvShow.id} to={`/tv/${tvShow.id}`}>
              <div className="actor-movies__div">
                <p>Tv show </p>
                <img
                  src={
                    tvShow.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                      : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2T5824oNgrzQEYWeOimkakYqM4KawtUGpX4mhwhbWcmj8vwz6"
                  }
                />
                <p>{tvShow.name || tvShow.title}</p>
                <p>Character : {tvShow.character}</p>
              </div>
            </Link>
          );
        })}
        {actorMoviesData.map((movie) => {
          return (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="actor-movies__div">
                <p>Movie </p>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2T5824oNgrzQEYWeOimkakYqM4KawtUGpX4mhwhbWcmj8vwz6"
                  }
                />
                <p>{movie.name || movie.title}</p>
                <p>Character : {movie.character}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Actor;
