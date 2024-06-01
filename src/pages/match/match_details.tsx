import React from "react";
import { useNavigate } from "react-router-dom";
import { useMatchState } from "../../context/match/context";

const MatchDetails = () => {
  const state = useMatchState();
  const { match, isLoading, isError, errorMessage } = state;
  const navigate = useNavigate();
  console.log(match);
  const goBack = () => {
    const token = localStorage.getItem("authToken") ?? "";
    if (token) {
      navigate("/account");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {match.name} - Live {match.sportName}
          Score, Commentary
        </h1>
        <div className="text-lg mb-4">
          <span className="ml-4 text-cyan-600 font-semibold">Venue:</span>{" "}
          {match.location}
          <span className="ml-4  text-cyan-600 font-semibold">
            Date & Time:
          </span>{" "}
          {new Date(match.startsAt).toLocaleString()}
        </div>

        <div className="scorecard bg-green-200 rounded p-4">
          <p className="text-center text-white text-xl font-bold"> Scorecard</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {Object.entries(match.score).map(([team, score]) => (
              <div
                className="text-center bg-cyan-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400"
                key={team}
              >
                <p className="text-2xl text-center font-semibold">{team}</p>
                <p className="text-xl text-center font-bold">{score}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-200 p-4 rounded-lg text-center mt-3">
          <h2 className="font-semibold text-xl mb-2">Match Info</h2>
          <p>
            <span className="font-bold text-green-700">Match:</span>{" "}
            {match.name}
          </p>
          <p>
            <span className="font-bold text-green-700">Starts At:</span>{" "}
            {new Date(match.startsAt).toLocaleString()}
          </p>
          <p>
            <span className="font-bold text-green-700">Ends At:</span>{" "}
            {new Date(match.endsAt).toLocaleString()}
          </p>

          <p>
            <span className="font-bold text-green-700">Venue:</span>{" "}
            {match.location}
          </p>
          <p>
            <span className="font-bold text-2xl text-green-700">Teams:</span>
            <ul>
              {match.teams.map((team) => (
                <li className="font-bold text-xl text-cyan-600" key={team.id}>
                  *{team.name}
                </li>
              ))}
            </ul>
          </p>

          <p className="font-semibold text-xl text-green-700 ">Story:</p>
          <p>{match.story}</p>
        </div>
        <button
          onClick={goBack}
          className="text-xl bg-green-300 hover:bg-green-500 px-4 py-1 text-center w-full h-10 rounded mx-2 mt-2 "
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default MatchDetails;
