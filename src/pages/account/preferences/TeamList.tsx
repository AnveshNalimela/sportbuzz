import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../config/constants";
import { useTeamsState } from "../../../context/teams/context";

const TeamList = ({ pteams, psports, fetchPrefernces, close }) => {
  const Teamstate = useTeamsState();
  const { teams, isLoading, isError, errorMessage } = Teamstate;
  const [checkedTeams, setCheckedTeams] = useState([]);

  useEffect(() => {
    // Set initially checked sports
    setCheckedTeams(Object.keys(pteams).filter((team) => pteams[team]));
  }, [psports]);

  const handleCheckboxChange = (teamName) => {
    const updatedCheckedTeams = checkedTeams.includes(teamName)
      ? checkedTeams.filter((name) => name !== teamName)
      : [...checkedTeams, teamName];

    setCheckedTeams(updatedCheckedTeams);
  };
  const updatePreferences = async (updatedPreferences) => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences: updatedPreferences }),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      const data = await response.json();

      console.log("succesfully updated the teams prefernces"); // Success message
      fetchPrefernces();
      close();
    } catch (error) {
      console.log("Error updating preferences:", error);
    }
  };

  const TPreferences = () => {
    console.log("update preferences");
    const updatedTeams = checkedTeams.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});
    const updatedPreferences = { teams: updatedTeams, sports: psports };
    updatePreferences(updatedPreferences);
  };

  return (
    <div className="grid grid-cols-2 gap-1 mb-3">
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-3 flex block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
        >
          <input
            type="checkbox"
            className="appearance-none border border-gray-400 rounded-md w-6 h-6 checked:bg-green-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 mr-2 "
            checked={checkedTeams.includes(team.name)}
            onChange={() => handleCheckboxChange(team.name)}
          />
          <p className="font-semibold text-gray-500">{team.name}</p>
        </div>
      ))}
      <Button
        className=" w-full mt-2 text-center  rounded-md bg-blue-400 py-2 px-3 text-lg/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={TPreferences}
      >
        Update Teams
      </Button>
    </div>
  );
};

export default TeamList;
