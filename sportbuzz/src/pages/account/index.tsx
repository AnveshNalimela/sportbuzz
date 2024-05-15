import React from "react";
import ArticlesList from "../home/articles/ArticlesList";
import MatchList from "../home/matches/MatchList";
import Preferences from "./preferences/preferences";

const Account = () => {
  const token = localStorage.getItem("authToken") ?? "";
  console.log(token);
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
        <Preferences />
      </div>
    </>
  );
};

export default Account;
