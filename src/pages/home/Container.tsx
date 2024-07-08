import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchSports } from "../../context/sports/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchTeams } from "../../context/teams/actions";
import { useTeamsDispatch } from "../../context/teams/context";

const Container = () => {
  const MatchesDispatch = useMatchesDispatch();
  const ArticlesDispatch = useArticlesDispatch();
  const SportsDispatch = useSportsDispatch();
  const TeamsDispatch = useTeamsDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
    fetchArticles(ArticlesDispatch);
    fetchSports(SportsDispatch);
    fetchTeams(TeamsDispatch);
  }, [MatchesDispatch, ArticlesDispatch, SportsDispatch, TeamsDispatch]);
  return <Outlet />;
};

export default Container;
