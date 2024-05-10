import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";

const Container = () => {
  const MatchesDispatch = useMatchesDispatch();
  const ArticlesDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
    fetchArticles(ArticlesDispatch);
  }, [MatchesDispatch, ArticlesDispatch]);
  return <Outlet />;
};

export default Container;
