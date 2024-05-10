import React from "react";
import { useMatchState } from "../../context/match/context";

const MatchDetails = () => {
  const state = useMatchState();
  const { match, isLoading, isError, errorMessage } = state;
  console.log(match);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold mb-2">
          {match.name} - Live {match.sportName}
          Score, Commentary
        </h1>
        <div className="text-sm mb-4">
          <span className="font-semibold">Series:</span> Indian Premier League
          2024
          <span className="ml-4 font-semibold">Venue:</span> {match.location}
          <span className="ml-4 font-semibold">Date & Time:</span>{" "}
          {new Date(match.startsAt).toLocaleString()}
        </div>
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Commentary
          </button>
          <button className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400">
            Scorecard
          </button>
          <button className="bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400">
            Squads
          </button>
        </div>
        <div className="scorecard bg-blue-400 rounded p-4">
          <p className="text-center text-white text-xl font-bold"> Scorecard</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(match.score).map(([team, score]) => (
              <div className="text-center bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400">
                <p className="text-2xl text-center font-semibold">{team}</p>
                <p className="text-xl text-center font-bold">{score}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mb-4">The scorecard will appear once the match starts.</p>
        <p className="font-semibold mb-2">Match starts at</p>
        <div className="bg-zinc-200 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Match Info</h2>
          <p>
            <span className="font-semibold">Match:</span> {match.name}
          </p>
          <p>
            <span className="font-semibold">Starts At:</span>{" "}
            {new Date(match.startsAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Ends At:</span>{" "}
            {new Date(match.endsAt).toLocaleString()}
          </p>

          <p>
            <span className="font-semibold">Venue:</span> {match.location}
          </p>
          <p>
            <span className="font-semibold">Teams:</span>
            <ul>
              {match.teams.map((team) => (
                <li key={team.id}>*{team.name}</li>
              ))}
            </ul>
          </p>

          <p className="font-semibold text-lg ">Story:</p>
          <p>{match.story}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Gujarat Titans Squad</h3>
          <p>
            Wriddhiman Saha (wk), Shubman Gill (c), Sai Sudharsan, Shahrukh
            Khan, David Miller, Rahul Tewatia, Rashid Khan, Noor Ahmad, Mohit
            Sharma, Joshua Little, Sandeep Warrier, Vijay Shankar, Manav Suthar,
            Jayant Yadav, Darshan Nalkande, Sharath BR, Kane Williamson, Matthew
            Wade, Umesh Yadav, Abhinav Manohar, Ravisinivasan Sai Kishore,
            Kartik Tyagi, Spencer Johnson, Azmatullah Omarzai, Sushant Mishra
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

{
  /* <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-4 shadow-md rounded-lg mx-auto max-w-lg my-8">
<h1 className="text-2xl font-bold mb-2">Football Match Review</h1>
<p className="text-sm text-zinc-600 dark:text-zinc-400">{match.name}</p>
<p className="text-sm text-zinc-600 dark:text-zinc-400">
  {match.startsAt}
</p>
<p className="text-sm text-zinc-600 dark:text-zinc-400">{match.endsAt}</p>
<p className="text-sm text-zinc-600 dark:text-zinc-400">
  {match.location}
</p>
<div className="mt-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
  <p className="text-sm font-semibold">Summary:</p>
  <p className="text-sm">{match.story}</p>
</div>

<div className="mt-4 grid grid-cols-2 gap-4">
  <div className="text-center">
    <p className="text-sm font-semibold"></p>
    <p className="text-lg font-bold">2</p>
  </div>
  <div className="text-center">
    <p className="text-sm font-semibold"></p>
    <p className="text-lg font-bold">2</p>
  </div>
</div>
</div> */
}
