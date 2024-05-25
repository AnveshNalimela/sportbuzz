import { Tab } from "@headlessui/react";
import React from "react";

const PreferredSportList = ({ sports }) => {
  console.log(sports);
  return (
    <div>
      {sports.map((sport) => (
        <Tab
          key={sport}
          className="rounded-full py-1 px-3 text-lg/6 font-semibold text-gray-600 focus:outline-none data-[selected]:bg-green-300 data-[hover]:bg-gray-400  data-[selected]:data-[hover]:bg-gray-300 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          {sport}
        </Tab>
      ))}
    </div>
  );
};

export default PreferredSportList;
