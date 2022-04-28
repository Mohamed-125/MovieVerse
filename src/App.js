import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Home";
import Actor from "./Pages/Actor/Actor";
import MovieDetails from "./Pages/MovieDetailsPage/MovieDetails";
import MovieGrid from "./Pages/MovieGrid/MovieGridTrending";
import Input from "./Components/Search/Search";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
export const context = createContext();
export const similarContext = createContext();
function App() {
  // the trending data
  const [trending, setTrending] = useState([]);
  // the popular data
  const [popular, setPopular] = useState([]);
  // the upcoming data
  const [upcoming, setUpcoming] = useState([]);
  // the top rated data for tv shows
  const [topRated_tv, setTopRated_tv] = useState([]);
  // popular data for tv shows
  const [popular_tv, setPopular_tv] = useState([]);
  // on air data for tv show
  const [onAir_tv, setOnAir_tv] = useState([]);
  // on airingToday  data for tv show
  const [airingToday_tv, setAiringToday_tv] = useState([]);

  // now there is the functions whick will fire and the change the page of the search url
  // to load more content

  // every section have his own state to prevent any proplems

  const [LoadMoreTrending, setLoadMoreTrending] = useState(1);
  const [LoadMorePopular, setLoadMorePopular] = useState(1);
  const [LoadMoreUpcoming, setLoadMoreUpcoming] = useState(1);
  const [LoadMoreSimilar, setLoadMoreSimilar] = useState(1);
  const [LoadMoreTopRatedTvShows, setLoadMoreTopRatedTvShows] = useState(1);
  const [LoadMorePopularTvShows, setLoadMorePopularTvShows] = useState(1);
  const [LoadMoreOnAirTvShows, setLoadMoreOnAirTvShows] = useState(1);
  const [LoadMoreAiringTodayTvShows, setLoadMoreAiringTodayTvShows] =
    useState(1);

  // some states for the similar section and the search

  const [similar, setSimilar] = useState([]);
  const [movieId, setMovieId] = useState("");
  // the list of movies of shows which the user searched for
  const [searchData, setSearchData] = useState([]);
  // to load more search data
  const [LoadMoreSearch, setLoadMoreSearch] = useState(1);
  // to know the pages of that search
  // i did this to know if there is pages or not
  // if there is pages when the user reach the end of them it will change the load more results to no more data
  const [searchPages, setSearchPages] = useState(1);
  const [params, setParams] = useState("");
  const [searchResults, setSearchResults] = useState("");
  // set the media type which the user is searching for bec in this api movies and shows may have the same id
  // so this is a good practice to avoid bugs when the use click on movie or show
  const [mediaType, setMediaType] = useState("moive");

  // apis which we are going to use

  const API_URL_Trending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${LoadMoreTrending}`;
  const API_URL_Popular = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMorePopular}`;
  const API_URL_Upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMoreUpcoming}`;
  const API_URL_TopRated_tv = ` https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMoreTopRatedTvShows} `;
  const API_URL_Popular_tv = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMorePopularTvShows}`;
  const API_URL_OnAir_tv = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMoreOnAirTvShows}`;
  const API_URL_AiringToday_tv = `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${LoadMoreAiringTodayTvShows}`;

  // the function which will fire on mount and when the user clicks load more

  const FetchFunction = (fetchUrl, setState, state) => {
    if (fetchUrl) {
      console.log(fetchUrl);
    }
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setState([
          ...state,
          ...data.results.filter((item) => {
            return item.name !== "Young Royals";
          }),
        ]);
      });
  };

  // to fetch the data on mount and when the user clicks load more

  useEffect(() => {
    FetchFunction(API_URL_Trending, setTrending, trending);
    FetchFunction(API_URL_Popular, setPopular, popular);
    FetchFunction(API_URL_Upcoming, setUpcoming, upcoming);
    FetchFunction(API_URL_TopRated_tv, setTopRated_tv, topRated_tv);
    FetchFunction(API_URL_Popular_tv, setPopular_tv, popular_tv);
    FetchFunction(API_URL_OnAir_tv, setOnAir_tv, popular_tv);
    FetchFunction(API_URL_AiringToday_tv, setAiringToday_tv, airingToday_tv);
  }, [
    LoadMoreTrending,
    LoadMorePopular,
    LoadMoreUpcoming,
    LoadMoreTopRatedTvShows,
    LoadMorePopularTvShows,
    LoadMoreOnAirTvShows,
    LoadMoreAiringTodayTvShows,
  ]);

  // the function to get similar shows when the use go into movie details

  useEffect(() => {
    if (movieId) {
      const API_URL_Similar = `https://api.themoviedb.org/3/${mediaType}/${parseInt(
        movieId
      )}/similar?api_key=${
        process.env.REACT_APP_MOVIE_API_KEY
      }&language=en-US&page=${LoadMoreSimilar}`;

      fetch(API_URL_Similar)
        .then((res) => res.json())
        .then((data) => {
          if (window.location.href.includes("similar/more")) {
            setSimilar([...similar, ...data.results]);
          } else {
            setSimilar([...data.results]);
          }
        });
    }
  }, [movieId, LoadMoreSimilar]);

  return (
    <similarContext.Provider value={[similar, LoadMoreSimilar]}>
      <context.Provider
        value={[
          trending,
          popular,
          upcoming,
          topRated_tv,
          popular_tv,
          onAir_tv,
          airingToday_tv,
          setLoadMoreTrending,
          setLoadMorePopular,
          setLoadMoreUpcoming,
          setTopRated_tv,
          setPopular_tv,
          setOnAir_tv,
          setAiringToday_tv,
        ]}
      >
        <HashRouter>
          <NavBar />
          <Input
            mediaType={mediaType}
            setMediaType={setMediaType}
            setSearchResults={setSearchResults}
            params={params}
            setSearchPages={setSearchPages}
            searchData={searchData}
            LoadMoreSearch={LoadMoreSearch}
            setSearchData={setSearchData}
          />
          <ScrollTop />

          {/* routes  */}

          <Routes>
            <Route
              path="/movie/trending/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setTrending}
                  loadMore={setLoadMoreTrending}
                  type={trending}
                />
              }
            />
            <Route
              path="/movie/popular/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setPopular}
                  loadMore={setLoadMorePopular}
                  type={popular}
                />
              }
            />
            <Route
              path="/movie/upcoming/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setUpcoming}
                  loadMore={setLoadMoreUpcoming}
                  type={upcoming}
                />
              }
            />
            <Route
              path="/tv/Top_Rated_Tv_Shows/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setTopRated_tv}
                  loadMore={setLoadMoreTopRatedTvShows}
                  type={topRated_tv}
                />
              }
            />
            <Route
              path="/tv/Popular_Tv_Shows/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setPopular_tv}
                  loadMore={setLoadMorePopularTvShows}
                  type={popular_tv}
                />
              }
            />
            <Route
              path="/tv/Tv_Shows_On_Air_This_Week/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setOnAir_tv}
                  loadMore={setLoadMoreOnAirTvShows}
                  type={onAir_tv}
                />
              }
            />
            <Route
              path="/tv/Tv_Shows_Airing_Today/more"
              element={
                <MovieGrid
                  mediaType={mediaType}
                  setType={setAiringToday_tv}
                  loadMore={setLoadMoreAiringTodayTvShows}
                  type={airingToday_tv}
                />
              }
            />
            <Route
              path={`/${mediaType}/similar/more`}
              element={
                <MovieGrid
                  mediaType={mediaType}
                  loadMore={setLoadMoreSimilar}
                  setType={setSimilar}
                  type={similar}
                />
              }
            />

            <Route
              path={`/${mediaType}/:movieId`}
              element={
                <MovieDetails
                  setMediaType={setMediaType}
                  mediaType={mediaType}
                  setMovieId={setMovieId}
                />
              }
            />
            <Route
              path={"/search/:searchWord"}
              element={
                <MovieGrid
                  mediaType={mediaType}
                  searchResults={searchResults}
                  loadedPages={LoadMoreSearch}
                  type={searchData}
                  searchPages={searchPages}
                  loadMore={setLoadMoreSearch}
                  setParams={setParams}
                />
              }
            />
            <Route path="/actor/:actorId" element={<Actor />} />
            <Route path="/MovieVerse/" element={<Home />} />
          </Routes>

          {/* routes end */}
        </HashRouter>
      </context.Provider>
    </similarContext.Provider>
  );
}

export default App;
