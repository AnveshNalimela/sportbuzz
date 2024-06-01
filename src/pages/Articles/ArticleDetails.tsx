import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticleState } from "../../context/article/context";

const ArticleDetails = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    const token = localStorage.getItem("authToken") ?? "";
    if (token) {
      navigate("/account");
    } else {
      navigate("/");
    }
  };

  const state = useArticleState();
  const { article, isLoading, isError, errorMessage } = state;

  if (!article) {
    return <div>Article not found!</div>;
  }
  if (isLoading) {
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-800">
      Article is Loading..
    </div>;
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
        <p className="text-lg font-semibold text-green-400 dark:text-zinc-400 mt-2">
          {article.summary}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          {article.content}
        </p>
        <div className="flex flex-wrap items-center mt-4">
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
            {article.sport.name}
          </p>
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2 ml-4">
            Date: {new Date(article.date).toLocaleString().split(",")[0]}
          </p>
          {article.teams.map((team) => (
            <p
              key={team.id}
              className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2 ml-4"
            >
              {team.name}
            </p>
          ))}
        </div>

        <button
          onClick={GoBack}
          className="text-lg bg-green-300 hover:bg-green-500 px-4 py-1 text-center w-full h-10 rounded mx-1 mt-3"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ArticleDetails;
