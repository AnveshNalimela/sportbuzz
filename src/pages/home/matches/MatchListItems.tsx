import React from "react";
import { useMatchesState } from "../../../context/matches/context";
import MatchItem from "./MatchItem";

export default function ProjectListItems() {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  const sortedMatches = matches.sort((a, b) => {
    const endDateA = new Date(a.endsAt).getTime();
    const endDateB = new Date(b.endsAt).getTime();
    return endDateB - endDateA; // Sort in descending order
  });

  // Step 2: Take the first five elements from the sorted array
  const recentMatches = sortedMatches.slice(0, 5);

  const filteredMatches = matches
    ?.filter((match) => match.isRunning)
    .slice(-5)
    .reverse();

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
      {recentMatches.map((match: any) => (
        <MatchItem key={match.id} matchId={match.id} />
      ))}
    </>
  );
}
