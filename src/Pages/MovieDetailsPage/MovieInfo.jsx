import React from "react";

const MovieInfo = ({ movieData, mediaType }) => {
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
    </div>
  );
};

export default MovieInfo;
