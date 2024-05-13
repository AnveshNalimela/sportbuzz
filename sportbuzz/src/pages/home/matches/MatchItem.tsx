import React, { useEffect, useState } from "react";
import football from "../../../assets/images/football.png";
import reload from "../../../assets/images/reload.png";
import { API_ENDPOINT } from "../../../config/constants";

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
      console.log(matchData);
      setMatch(matchData);
    } catch (error) {
      console.log("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchById(matchId);
  }, [matchId]);

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-5 flex py-2 bg-zinc-100">
        <div>
          <div className="text-sm text-zinc-700">{match.name}</div>
          <div className="text-sm font-semibold text-green-400">
            {match.sportName}
          </div>
        </div>

        <div>
          <img
            src={reload}
            className="h-10 w-20 hover:bg-blue-400 p-1 rounded"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4 grid grid-cols-2 gap-2">
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

        <div className="text-sm text-zinc-600 mt-3"> </div>
      </div>
      <div className="px-4 py-2 bg-zinc-200 mt-auto">
        <div className="flex justify-around text-xs text-zinc-700">
          <a href="#" className="hover:text-blue-500">
            FANTASY
          </a>
          <a href="#" className="hover:text-blue-500">
            TABLE
          </a>
          <a href="#" className="hover:text-blue-500">
            TABLE
          </a>
        </div>
      </div>
    </div>
  );
};

export default MatchItem;
