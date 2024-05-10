import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticleState } from "../../context/article/context";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  const state = useArticleState();
  const { article, isLoading, isError, errorMessage } = state;
  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-800">
      <img
        className="w-full h-64 object-cover object-center"
        src={article.thumbnail}
        alt={article.title}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          {article.title}
        </h2>
        <p className="text-lg font-semibold  text-green-400 dark:text-zinc-400 mt-2">
          {article.summary}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          {article.content}
        </p>
        <div className="flex items-center mt-4">
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold  text-zinc-600 dark:text-zinc-400">
            {article.sport.name}
          </p>
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold  text-zinc-600 dark:text-zinc-400 ml-4">
            Date :{new Date(article.date).toLocaleString().split(",")[0]}
          </p>
          {article.teams.map((team) => (
            <p
              key={team.id}
              className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold ml-4"
            >
              {team.name}
            </p>
          ))}
        </div>
        <button
          onClick={GoBack}
          className="bg-blue-500 text-white p-2 rounded-lg mt-4"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ArticleDetails;
