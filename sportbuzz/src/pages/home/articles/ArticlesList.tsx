import React from "react";
import ArticleListItems from "./ArticleListItems";

const ArticlesList: React.FC = () => {
  return (
    <div className="w-3/4 grid gap-4 grid-cols-1 mt-5">
      <ArticleListItems />
    </div>
  );
};

export default ArticlesList;
