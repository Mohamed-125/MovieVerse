import React, { useEffect, useContext, useState } from "react";
import "./MovieGrid.css";
import { context } from "../../App";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MovieGrid = ({
  type,
  searchResults,
  loadedPages,
  searchPages,
  loadMore,
  setParams,
  setType,
  mediaType,
}) => {
  const clickHandler = () => {
    loadMore((pre) => pre + 1);
  };
  const { searchWord } = useParams();

  useEffect(() => {
    if (setType) {
      setType(
        type.filter((item, index) => {
          return index < 20;
        })
      );
    }
  }, []);
  useEffect(() => {
    if (searchWord) {
      setParams(searchWord);
    }
  }, [searchWord]);

  return (
    <div className="section__padding">
      <div className="MovieGrid__grid_parent ">
        {type?.map((item) => {
          const img = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

          return (
            <Link key={item.id} to={`/${mediaType}/${item.id}`}>
              <div className="movieGrid__movie_div">
                <img
                  src={
                    item.poster_path
                      ? img
                      : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2T5824oNgrzQEYWeOimkakYqM4KawtUGpX4mhwhbWcmj8vwz6"
                  }
                />
                <p>{item.name || item.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {parseInt(searchResults) > 0 || !searchResults ? (
        loadedPages !== searchPages || !loadedPages ? (
          <p className="comp__LoadMore" onClick={clickHandler}>
            Load More
          </p>
        ) : (
          <p style={{ textAlign: "center" }}>There Is No More Results</p>
        )
      ) : (
        <p style={{ textAlign: "center" }}>No Results</p>
      )}
    </div>
  );
};

export default MovieGrid;
