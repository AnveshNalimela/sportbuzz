import React from "react";
import MatchListItems from "./MatchListItems";
import { useMatchDispatch } from "../../../context/match/context";
import { useParams } from "react-router-dom";

const ProjectList: React.FC = () => {
  const MatchDispatch = useMatchDispatch();
  const match = useParams();
  const matchId = parseInt(match.matchID);
  return (
    <div className="h-400 grid gap-4 grid-cols-5 my-5 border rounded p-3">
      <MatchListItems />
    </div>
  );
};

export default ProjectList;
