import React from "react";

const MovieGenres = ({ movieData }) => {
  return (
    <div className="genres__contener">
      {movieData?.genres?.map((item) => {
        return (
          <div key={item.name} className="genre__contener">
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGenres;
