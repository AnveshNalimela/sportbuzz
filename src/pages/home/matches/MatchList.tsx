import React from "react";
import MatchListItems from "./MatchListItems";

const MatchList: React.FC = () => {
  return (
    <div>
      <div className="h-400 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 my-2 rounded p-3 ">
        <MatchListItems />
      </div>
    </div>
  );
};

export default MatchList;
