import React from "react";
import { Link } from "react-router-dom";
import { useArticlesState } from "../../../context/articles/context";

export default function ArticleListItems({ selected }) {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  let articlesList = articles;
  if (selected) {
    articlesList = articles.filter(
      (article) => article.sport.name === selected
    );
  }

  // Check if matches is undefined or null
  if (articles === undefined || articles === null) {
    return <span>Loading...</span>;
  }

  // Check for loading state
  if (isLoading) {
    return <span>Loading...</span>;
  }

  // Check for error state
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="h-300 grid gap-4 grid-cols-4 my-5 rounded p-3">
      {articlesList
        ?.slice(Math.max(articlesList.length - 8, 0))
        .reverse()
        .map((article: any) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden  my-2"
          >
            <img
              src={article.thumbnail}
              alt="Article Thumbnail"
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4 w-full">
              <h3 className="text-center text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                {article.title}
              </h3>

              <p className="text-zinc-600 text-sm dark:text-zinc-400 mt-1">
                {article.summary}
              </p>
              <div className="flex justify-between   w-full text-center mt-4">
                <p className="text-zinc-600 dark:text-zinc-400 mt-2 font-bold">
                  {new Date(article.date).toLocaleString().split(",")[0]}
                </p>
                <p className="bg-slate-200 rounded px-3 py-1 font-semibold dark:text-zinc-400 mt-2 font-bold">
                  {article.sport.name}
                </p>
              </div>
              <Link
                key={article.id}
                to={`articles/${article.id}`}
                className="mt-auto"
              >
                <button className="bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-lg mt-3 w-full">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
