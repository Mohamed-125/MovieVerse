import React, { useContext } from "react";
import { context } from "./App";
import Section from "./Components/Section/Section";

const Home = () => {
  const [
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
  ] = useContext(context);

  return (
    <div className="section__padding">
      <Section
        mediaType="movie"
        // this is the same in all sections components
        // the link of the section
        LinkName="trending"
        // the content in this section
        type={trending}
        // the function which will increment the number of pages to load more content
        setMore={setLoadMoreTrending}
        // the title of the section
        title="Trending Movies This Week"
      />
      <Section
        mediaType="movie"
        LinkName="Popular"
        type={popular}
        setMore={setLoadMorePopular}
        title="Popular Movies"
      />
      <Section
        mediaType="movie"
        LinkName="Upcoming"
        type={upcoming}
        setMore={setLoadMoreUpcoming}
        title="Upcoming Movies"
      />

      {/* tv sections  */}

      <Section
        mediaType="tv"
        LinkName="Top_Rated_Tv_Shows"
        type={topRated_tv}
        setMore={setTopRated_tv}
        title="Top Rated Tv Shows"
      />
      <Section
        mediaType="tv"
        LinkName="Popular_Tv_Shows"
        type={popular_tv}
        setMore={setPopular_tv}
        title="Popular Tv Shows"
      />
      <Section
        mediaType="tv"
        LinkName="Tv_Shows_On_Air_This_Week"
        type={onAir_tv}
        setMore={setOnAir_tv}
        title="Tv Shows On Air This Week"
      />
      <Section
        mediaType="tv"
        LinkName="Tv_Shows_Airing_Today"
        type={airingToday_tv}
        setMore={setAiringToday_tv}
        title="Airing Today Tv Shows"
      />
    </div>
  );
};

export default Home;
