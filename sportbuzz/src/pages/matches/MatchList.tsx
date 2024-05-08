import React from "react";
import MatchListItems from "./MatchListItems";

const ProjectList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-5 mt-5">
      <MatchListItems />
    </div>
  );
};

export default ProjectList;
