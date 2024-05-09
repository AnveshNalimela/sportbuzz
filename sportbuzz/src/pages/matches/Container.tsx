import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";

const Container = () => {
  const MatchesDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
  }, [MatchesDispatch]);
  return <Outlet />;
};

export default Container;
