import { Tab } from "@headlessui/react";
import React from "react";
import { useSportsState } from "../../../context/sports/context";

const SportListItems = () => {
  const state = useSportsState();
  const { sports, isLoading, isError, errorMessage } = state;
  return (
    <div>
      {sports.map((sport) => (
        <Tab
          key={sport.id}
          className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300  data-[hover]:bg-gray-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          {sport.name}
        </Tab>
      ))}
    </div>
  );
};

export default SportListItems;
