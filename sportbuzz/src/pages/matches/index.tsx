import React from "react";

import MatchList from "./MatchList";

const Projects = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Matches
        </h2>
      </div>
      <MatchList />
    </>
  );
};

export default Projects;


