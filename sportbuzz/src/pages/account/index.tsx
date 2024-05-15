import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import PArticles from "./Articles/PArticles";
import PMatchList from "./Matches/PMatchList";
import Preferences from "./preferences/preferences";
interface PMatchListProps {
  psports: any; // Adjust the type according to your data structure
  pteams: any; // Adjust the type according to your data structure
}

const Account = () => {
  let [sports, setSports] = useState({});
  let [teams, setTeams] = useState({});
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
      console.log(sports, teams);
    } catch (error) {
      console.log("Error fetching preferences:", error);
    }
  };
  useEffect(() => {
    fetchPrefernces();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Live Matches
        </h2>
      </div>
      <PMatchList psports={sports} pteams={teams} />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Trending Articles
        </h2>
      </div>
      <div className="flex">
        <PArticles psports={sports} />
        <Preferences
          fetchPrefernces={fetchPrefernces}
          psports={sports}
          pteams={teams}
        />
      </div>
    </>
  );
};

export default Account;
