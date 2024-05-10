import React from "react";

import ArticlesList from "./articles/ArticlesList";
import MatchList from "./matches/MatchList";

const Matches = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Matches
        </h2>
      </div>
      <MatchList />
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Articles
        </h2>
      </div>
      <ArticlesList />
    </>
  );
};

export default Matches;
