import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../customHooks/useFetch";

import Img from "../../../components/lazyLoadingImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  // console.log("loading->" + loading);

  useEffect(() => {
    // console.log("result->" + data?.results);
    // console.log("url->" + url.backdrop);
    if (data?.results != undefined) {
      const bg =
        url.backdrop +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
      // console.log("bg->" + { bg });
    }
  }, [data, url.backdrop]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandlerButton = () => {
    //console.log(event);
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  // console.log({ background });
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">{<Img src={background} />}</div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={() => searchQueryHandlerButton()}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
