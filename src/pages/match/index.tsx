import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMatchById } from "../../context/match/actions";
import { useMatchDispatch } from "../../context/match/context";
import MatchDetails from "./match_details";

const Match = () => {
  const MatchDispatch = useMatchDispatch();
  const match = useParams();
  const matchId = parseInt(match.matchID);

  useEffect(() => {
    fetchMatchById(MatchDispatch, matchId);
  }, [MatchDispatch]);
  return (
    <>
      <MatchDetails />
    </>
  );
};

export default Match;
