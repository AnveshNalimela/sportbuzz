import React from "react";
import PreferedMatchList from "./PreferedMatchList";

// Define an interface for the props expected by PMatchList
interface PMatchListProps {
  psports: any; // Adjust the type according to your data structure
  pteams: any; // Adjust the type according to your data structure
}

const PMatchList: React.FC<PMatchListProps> = ({ psports, pteams }) => {
  return (
    <div>
      <div className="h-400 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 my-2 rounded p-3 border rounded border-gray-200 mt-2 px-5 py-3">
        <PreferedMatchList psports={psports} pteams={pteams} />
      </div>
    </div>
  );
};

export default PMatchList;
