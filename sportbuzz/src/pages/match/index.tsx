import React from "react";
import { useParams } from "react-router-dom";
import { useMatchesState } from "../../context/matches/context";

const Match = () => {
  const { matchID } = useParams();
  const matchState = useMatchesState();
  const { matches, isLoading: isMatchesLoading } = matchState;

  const match = matches?.find((match) => `${match.id}` === matchID);
  console.log(match);

  if (!match) {
    return <>No such Match!</>;
  }

  if (isMatchesLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-4 shadow-md rounded-lg mx-auto max-w-lg my-8">
      <h1 className="text-2xl font-bold mb-2">
        {match.sportName} Match Review
      </h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm font-semibold">Barcelona</p>
          <p className="text-lg font-bold">2</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">Real Madrid</p>
          <p className="text-lg font-bold">2</p>
        </div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{match.name}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Starts At: {new Date().toLocaleString()}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Ends At: {new Date(match.endsAt).toLocaleString()}
      </p>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {match.location}
      </p>
      <div className="mt-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <p className="text-sm font-semibold">Summary:</p>
        <p className="text-sm">{}</p>
      </div>
    </div>
  );
};

export default Match;
