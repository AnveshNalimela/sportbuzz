import React, { useState } from "react";
import { useMatchesState } from "../../../context/matches/context";
import MatchItem from "./MatchItem";
import { API_ENDPOINT } from "../../../config/constants";

export default function PreferedMatchList() {
  let [sports, setSports] = useState({});
  let [teams, setTeams] = useState({});
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;
  const sortedMatches = matches.sort((a, b) => {
    const endDateA = new Date(a.endsAt).getTime();
    const endDateB = new Date(b.endsAt).getTime();
    return endDateB - endDateA; // Sort in descending order
  });
  const fetchPrefernces = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the authorization token in the header
        },
      });
      const data = await response.json();
      const preferences = data.preferences;
      setSports(preferences.sports);
      setTeams(preferences.teams);
      console.log(preferences, "are succesfully retrieved");
    } catch (error) {
      console.log("Error fetching preferences:", error);
    }
  };
  
  // Step 2: Take the first five elements from the sorted array
  const recentMatches = sortedMatches.slice(0, 5);

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
  if (recentMatches.length === 0) {
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
