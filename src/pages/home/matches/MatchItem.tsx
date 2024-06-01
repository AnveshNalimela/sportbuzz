import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import completed from "../../../assets/images/completed.png";
import football from "../../../assets/images/football.png";
import live from "../../../assets/images/live.png";
import reload from "../../../assets/images/reload.png";
import { API_ENDPOINT } from "../../../config/constants";
import "./styles.css";

interface MatchItemProps {
  matchId: number;
}

interface Match {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [key: string]: string };
  teams: string[];
  sportName: string;
  playingTeam: number;
  story: string;
}

const MatchItem: React.FC<MatchItemProps> = ({ matchId }) => {
  const [match, setMatch] = useState<Match | null>(null);

  const fetchMatchById = async (matchId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const matchData = await response.json();

      setMatch(matchData);
    } catch (error) {
      console.log("Error fetching match details:", error);
    }
  };
  const handleRefreshScores = () => {
    fetchMatchById(matchId);
    console.log("match is refreshed"); // Fetch match details again to refresh scores
  };

  useEffect(() => {
    fetchMatchById(matchId);
  }, [matchId]);
  // Get the teams and their scores from the match object
  const findWinner = () => {
    const teams = Object.keys(match.score);
    const scores = Object.values(match.score).map(Number);

    // Find the index of the team with the highest score
    const highestScoreIndex = scores.indexOf(Math.max(...scores));

    // Determine the winner
    const winner = teams[highestScoreIndex];
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col ">
      <Link key={match.id} to={`matches/${match.id}`}>
        <div className="px-5 flex py-2 bg-zinc-100">
          <div>
            <div className="text-sm text-zinc-700">{match.name}</div>
            <div className="text-sm font-semibold text-green-400">
              {match.sportName}
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4 h-30">
        <div className="mt-4 grid grid-cols-2 gap-2 ">
          <div>
            {Object.entries(match.score).map(([team, score]) => (
              <div className="flex mt-2" key={team}>
                <img
                  src={football}
                  alt="Team Logo"
                  className="mr-2 w-4 h-4 inline-block mt-1"
                />
                <span className="font-semibold inline-block">{team}</span>
                <span className="font-semibold text-end ml-5">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>{" "}
      {/* This div pushes the last div to the bottom */}
      <div className="px-4 py-2 bg-zinc-200">
        <div className="flex justify-around text-xs text-zinc-700">
          {match.isRunning ? (
            <div className="flex justify-around ">
              <img src={live} alt="Running" className="w-20 h-15 bg-zinc " />
              <button onClick={handleRefreshScores} type="button" disabled>
                <img
                  id="reload"
                  src={reload}
                  className="onclick:animate-spin h-8 w-8 hover:bg-blue-400 p-1 rounded justify-end ml-4 "
                />
              </button>
            </div>
          ) : (
            <div className="flex justify-around ">
              <img src={completed} alt="Completed" className="w-15 h-12 mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchItem;
