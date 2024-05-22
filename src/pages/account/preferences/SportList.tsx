import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../config/constants";
import { useSportsState } from "../../../context/sports/context";

const SportList = ({ psports, pteams, fetchPrefernces, close }) => {
  const state = useSportsState();
  const { sports } = state;

  console.log(psports, pteams);

  const [checkedSports, setCheckedSports] = useState([]);

  useEffect(() => {
    // Set initially checked sports
    setCheckedSports(Object.keys(psports).filter((sport) => psports[sport]));
  }, [psports]);

  const handleCheckboxChange = (sportName) => {
    const updatedCheckedSports = checkedSports.includes(sportName)
      ? checkedSports.filter((name) => name !== sportName)
      : [...checkedSports, sportName];

    setCheckedSports(updatedCheckedSports);
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

      console.log("succesfully updated the sports prefernces");
      fetchPrefernces();
      close(); // Success message
    } catch (error) {
      console.log("Error updating preferences:", error);
    }
  };
  console.log(sports);

  const SPreferences = () => {
    console.log("update preferences");
    const updatedSports = checkedSports.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});
    const updatedPreferences = { teams: pteams, sports: updatedSports };
    updatePreferences(updatedPreferences);
  };

  return (
    <div className="grid grid-cols-2 gap-1 mb-3">
      {sports.map((sport) => (
        <div
          key={sport.id}
          className="p-3 flex block rounded-lg py-2 px-3 transition hover:bg-gray-200/5"
        >
          <input
            type="checkbox"
            className="appearance-none border border-gray-400 rounded-md w-6 h-6 checked:bg-green-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 mr-2 "
            checked={checkedSports.includes(sport.name)}
            onChange={() => handleCheckboxChange(sport.name)}
          />
          <p className="font-semibold text-gray-500">{sport.name}</p>
        </div>
      ))}
      <Button
        className=" w-full mt-2 text-center  rounded-md bg-blue-400 py-2 px-3 text-lg/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={SPreferences}
      >
        Update Sports
      </Button>
    </div>
  );
};

export default SportList;
