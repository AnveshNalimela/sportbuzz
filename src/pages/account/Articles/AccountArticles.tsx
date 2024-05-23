import React from "react";
import ArticlesList from "../../home/articles/ArticlesList";
import PreferredArticles from "./PreferredArticles";
import "./style.css";
// Define an interface for the props expected by PMatchList
interface PArticlesProps {
  psports: any;
  pteams: any; // Adjust the type according to your data structure
}

const AccountArticles: React.FC<PArticlesProps> = ({ psports, pteams }) => {
  if (typeof psports === "object" && typeof pteams === "object") {
    const sports = Object.keys(psports);
    const teams = Object.keys(pteams);

    if (sports.length === 0 && teams.length === 0) {
      return (
        <div className="border-2 border-slate-100 rounded-lg p-4">
          <h2 className="text-red-500 text-center font-semibold py-5 mb-1">
            Add Prefernces for Better Experince
          </h2>
          <ArticlesList />
        </div>
      );
    } else {
      return (
        <div className="border-2 border-slate-100 rounded-lg p-4">
          <PreferredArticles sports={sports} teams={teams} />
        </div>
      );
    }
  } else {
    return (
      <>
        <h2 className="text-red-500 text-center font-semibold py-10 mb-1 border-3">
          Add Prefernces for Better Experinces
        </h2>
        <ArticlesList />
      </>
    );
  }
};

export default AccountArticles;
