import React from "react";

import ArticlesList from "./articles/ArticlesList";
import Favourites from "./favourites";
import MatchList from "./matches/MatchList";

const Home = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Trending Matches
        </h2>
      </div>
      <MatchList />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Articles
        </h2>
      </div>
      <div className="flex">
        <ArticlesList />
        <Favourites />
      </div>
    </>
  );
};

export default Home;
