import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
const Search = ({
  LoadMoreSearch,
  setSearchData,
  searchData,
  setSearchPages,
  params,
  setSearchResults,
  setMediaType,
  mediaType,
}) => {
  // there is a problem with useNaivgte which renders the page twice
  // so you have to click back twice and i dont know why
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const ref = useRef();
  const selectRef = useRef();
  // save what the use typed in the input to search for it
  const submitHandler = (e) => {
    e.preventDefault();
    setSearchWord(ref.current.value);
    console.log(selectRef.current.value);
    if (selectRef.current.value === "movies") {
      setMediaType("movie");
    } else {
      setMediaType("tv");
    }
  };

  const selectHandler = (e) => {
    if (e.target.value === "movies") {
      setMediaType("movie");
    } else {
      setMediaType("tv");
    }
  };
  const SEARCH_MOVIES_URL = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${params}&page=${LoadMoreSearch}&include_adult=false`;

  // start searching if the work is valid
  useEffect(() => {
    window.addEventListener("popstate", () => {
      if (window.location.pathname === "/") {
        ref.current.value = null;
      }
    });
  }, []);
  useEffect(() => {
    if (window.location.href.includes("tv")) {
      setMediaType("tv");
    } else {
      setMediaType("movie");
    }
  }, [window.location.href]);
  // go to the search page
  useEffect(() => {
    if (searchWord.length > 0) {
      navigate(`/search/${searchWord}`, {});
    }
  }, [searchWord]);

  // fetch more data when the user load more information
  useEffect(() => {
    if (searchWord.length > 0) {
      fetch(SEARCH_MOVIES_URL)
        .then((res) => res.json())
        .then((data) => {
          setSearchPages(data.total_pages);
          setSearchData([...searchData, ...data.results]);
        });
    }
  }, [LoadMoreSearch]);
  // to search for the params when we go back from the current page
  useEffect(() => {
    fetch(SEARCH_MOVIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.total_results);
        setSearchPages(data.total_pages);
        setSearchData([...data.results]);
      });
    ref.current.value = params;
  }, [params, mediaType]);

  return (
    <div className="Search__div">
      <form onSubmit={submitHandler}>
        <input
          className="search__input"
          type="text"
          placeholder="Search Movie"
          ref={ref}
        />
      </form>

      <select
        ref={selectRef}
        onClick={window.location.href.includes("search") ? selectHandler : null}
      >
        <option> movies </option>
        <option> tv shows </option>
      </select>
    </div>
  );
};

export default Search;
