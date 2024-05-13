import React from "react";
import { Link } from "react-router-dom";
import { useMatchesState } from "../../../context/matches/context";
import MatchItem from "./MatchItem";

export default function ProjectListItems() {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;
  const filteredMatches = matches
    ?.filter((match) => match.isRunning)
    .slice(-5)
    .reverse();
  console.log(filteredMatches);
  // Check if matches is undefined or null
  if (matches === undefined || matches === null) {
    return <span>Loading...</span>;
  }

  // Check for loading state
  if (isLoading) {
    return <span>Loading...</span>;
  }

  // Check for error state
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  if (filteredMatches.length === 0) {
    return (
      <h2 className="text-red-500 text-center font-semibold py-10">
        No Live Matches currently Going On
      </h2>
    );
  }

  return (
    <>
      {filteredMatches.map((match: any) => (
        <Link key={match.id} to={`matches/${match.id}`}>
          <MatchItem matchId={match.id} />
        </Link>
      ))}
    </>
  );
}
