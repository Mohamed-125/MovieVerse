import React, { useEffect, useState } from "react";
import "./Section.css";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link } from "react-router-dom";
const Section = ({ title, type, setMore, LinkName, mediaType }) => {
  const [content, setContent] = useState([]);
  // handle the load more button click
  const clickHandler = () => {
    let clickedBefore = false;
    clickedBefore && setMore((pre) => pre + 1);
    clickedBefore = true;
  };

  // to take the first 20 movie from the array of movies
  useEffect(() => {
    setContent(type.slice(0, 20));
  }, [type]);

  return (
    <div className={`section__contener `}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          paddingLeft: "2rem",
        }}
      >
        <h2> {title}</h2>
        <Link to={`/${mediaType}/${LinkName}/more`}>
          <p className="comp__LoadMore" onClick={clickHandler}>
            Load More
          </p>
        </Link>
      </div>
      <ScrollContainer className="section__content_parent_wraper">
        <div className="section__content_contener">
          {content?.map((item) => {
            const img = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
            return (
              <Link
                onClick={() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
                key={item.id}
                to={`/${mediaType}/${item.id}`}
              >
                <div className="section__movieDiv">
                  <img src={img} />
                  <p>{item.name || item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default Section;
