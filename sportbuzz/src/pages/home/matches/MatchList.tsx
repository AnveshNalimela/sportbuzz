import React from "react";
import MatchListItems from "./MatchListItems";

const ProjectList: React.FC = () => {
  return (
    <div className="h-400 grid gap-4 grid-cols-5 my-5">
      <MatchListItems />
    </div>
  );
};

export default ProjectList;
