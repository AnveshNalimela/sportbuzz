import React from "react";
import { useMatchesState } from "../../../context/matches/context";
import MatchItem from "../../home/matches/MatchItem";
interface PMatchListProps {
  psports: any; // Adjust the type according to your data structure
  pteams: any; // Adjust the type according to your data structure
}

export default function PreferedMatchList({ psports, pteams }) {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;
  const sortedMatches = matches.sort((a, b) => {
    const endDateA = new Date(a.endsAt).getTime();
    const endDateB = new Date(b.endsAt).getTime();
    return endDateB - endDateA; // Sort in descending order
  });
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
  if (typeof psports === "object" && typeof pteams === "object") {
    const sports = Object.keys(psports);
    const teams = Object.keys(pteams);
    if (sports.length == 0 && teams.length == 0) {
      let recentMatches = sortedMatches.slice(0, 4);
      return (
        <>
          <h2 className="text-red-500 text-center font-semibold py-10">
            Add Prefernces for Better Experinces
          </h2>
          {recentMatches.map((match: any) => (
            <MatchItem key={match.id} matchId={match.id} />
          ))}
        </>
      );
    } else {
      const filteredMatches = sortedMatches.filter((match) => {
        // Check if sportName exists in the sports array
        const sportExists = sports.some((sport) => sport === match.sportName);
        // Check if both teams exist in the teams array
        //feedback:Prefernces matches are updated based selected teams
        //Matches are updated based on both selected teams and sports
        const teamExists1 = teams.some((team) => team === match.teams[0].name);
        const teamExists2 = teams.some((team) => team === match.teams[1].name);

        // Return true if at least one condition is met
        return sportExists || teamExists1 || teamExists2;
      });
      // Display the first five matches from the filtered array
      let recentMatches = filteredMatches.slice(0, 5);
      console.log(recentMatches);
      return (
        <>
          {recentMatches.map((match: any) => (
            <MatchItem key={match.id} matchId={match.id} />
          ))}
        </>
      );
    }
  } else {
    let recentMatches = sortedMatches.slice(0, 4);
    return (
      <>
        <h2 className="text-red-500 text-center font-semibold py-10">
          Add Prefernces for Better Experinces
        </h2>
        {recentMatches.map((match: any) => (
          <MatchItem key={match.id} matchId={match.id} />
        ))}
      </>
    );
  }
}
