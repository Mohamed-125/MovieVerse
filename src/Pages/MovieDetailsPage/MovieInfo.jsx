import React, { useEffect } from "react";

const MovieInfo = ({ movieData, mediaType }) => {
  useEffect(() => {
    if (movieData) {
      console.log(movieData);
    }
  }, [movieData]);
  useEffect(() => {
    console.log(mediaType);
  }, [mediaType]);
  return (
    <div style={{ marginLeft: "2rem" }}>
      <h4> {mediaType === "tv" ? "series" : "movie"} Information</h4>

      {mediaType === "movie" && <p>Time : {movieData.runtime} </p>}
      <p>
        Languages :
        <span>
          {movieData?.spoken_languages?.map((lang, index) => {
            return movieData.spoken_languages.length > 0
              ? index < movieData.spoken_languages.length - 2
                ? `${lang.name}  ,  `
                : lang.name
              : lang.name;
          })}
        </span>
      </p>
      {mediaType === "movie" && (
        <p>
          Budget : {movieData.budget > 100000 ? movieData.budget : "unKnown"}
          {movieData.budget > 100000 && " $"}
        </p>
      )}

      <p>Status : {movieData.status} </p>
      {mediaType === "tv" && movieData ? (
        <>
          <p> avarge time of the episode : {movieData?.episode_run_time} </p>
          <p>last episode date : {movieData?.last_episode_to_air?.air_date}</p>
          <p>
            last episode number :{" "}
            {movieData?.last_episode_to_air?.episode_number}
          </p>
          <p>last episode name : {movieData?.last_episode_to_air?.name}</p>
          {movieData.next_episode_to_air ? (
            <>
              <p>
                next episode date:
                {movieData.next_episode_to_air.air_date}
              </p>
              <p>
                next episode number :
                {movieData.next_episode_to_air.episode_number}
              </p>
              <p>
                next episode name :
                {movieData.next_episode_to_air.name &&
                movieData.next_episode_to_air.name !== ""
                  ? movieData.next_episode_to_air.name
                  : "unset"}
              </p>{" "}
            </>
          ) : null}
          <p> number of seasons : {movieData?.number_of_seasons} </p>
          <p>number of total episodes : {movieData?.number_of_episodes} </p>
        </>
      ) : null}
    </div>
  );
};

export default MovieInfo;
