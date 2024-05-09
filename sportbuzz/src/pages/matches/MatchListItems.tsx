import React from "react";
import { Link } from "react-router-dom";
import { useMatchesState } from "../../context/matches/context";

export default function ProjectListItems() {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;
  const matchesList = matches.matches;
  console.log(matchesList);
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

  return (
    <>
      {matchesList
        ?.slice(Math.max(matchesList.length - 5, 0))
        .reverse()
        .map((match: any) => (
          <Link key={match.id} to={`/${match.id}`}>
            <div className="match border-2 p-4 mx-2 rounded shadow hover:scale(1.1)">
              <p className="text-xl font-bold text-center text-green-600">
                {match.sportName}
              </p>
              <h3 className="text-xl font-semibold text-cyan-600 mb-2 border-b pb-1">
                {match.name}
              </h3>
              <p className="text-sm">
                <strong>Location:</strong> {match.location}
              </p>

              <p className="text-sm">
                <strong>Ends At:</strong>{" "}
                {new Date(match.endsAt).toLocaleString()}
              </p>
              <p className="text-sm">
                Is Running: <strong>{match.isRunning ? "Yes" : "No"}</strong>
              </p>
            </div>
          </Link>
        ))}
    </>
  );
}
