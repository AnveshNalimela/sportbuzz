import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchSports } from "../../context/sports/actions";
import { useSportsDispatch } from "../../context/sports/context";

const Container = () => {
  const MatchesDispatch = useMatchesDispatch();
  const ArticlesDispatch = useArticlesDispatch();
  const SportsDispatch = useSportsDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
    fetchArticles(ArticlesDispatch);
    fetchSports(SportsDispatch);
  }, [MatchesDispatch, ArticlesDispatch, SportsDispatch]);
  return <Outlet />;
};

export default Container;
