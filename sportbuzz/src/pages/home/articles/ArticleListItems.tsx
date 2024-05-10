import React from "react";
import { useArticlesState } from "../../../context/articles/context";

export default function ArticleListItems() {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const articlesList = articles;
  console.log(articlesList);
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
    <>
      {articlesList
        ?.slice(Math.max(articlesList.length - 5, 0))
        .reverse()
        .map((article: any) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden flex"
          >
            <img
              src={article.thumbnail}
              alt="Article Thumbnail"
              className="w-1/3 h-48 object-cover object-center"
            />
            <div className="p-4 w-2/3">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                {article.title}
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                {new Date(article.date).toLocaleString()}
              </p>
              <p className="text-green-600 font-semibold dark:text-zinc-400 mt-1">
                {article.sport.name}
              </p>
              <p className="text-zinc-600 text-sm dark:text-zinc-400 mt-1">
                {article.summary}
              </p>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-2">
                Read more
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
