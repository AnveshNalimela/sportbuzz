import React from "react";

import { SportsProvider } from "../../context/sports/context";
import ArticlesList from "./articles/ArticlesList";
import MatchList from "./matches/MatchList";

const Home = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Live Matches
        </h2>
      </div>
      <MatchList />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Trending Articles
        </h2>
      </div>
      <div className="flex">
       
          <ArticlesList />
       
      </div>
    </>
  );
};

export default Home;
