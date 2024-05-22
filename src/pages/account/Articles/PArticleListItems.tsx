import React from "react";
import { Link } from "react-router-dom";
import { useArticlesState } from "../../../context/articles/context";

const PArticleListItems = ({ psports }) => {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  const sortedArticles = articles.sort((a, b) => {
    const endDateA = new Date(a.date).getTime();
    const endDateB = new Date(b.date).getTime();
    return endDateB - endDateA; // Sort in descending order
  });
  const sports = Object.keys(psports);

  // Step 2: Take the first five elements from the sorted array
  const filteredArticles = sortedArticles.filter((match) => {
    // Check if sportName exists in the sports array
    const sportExists = sports.some((sport) => sport === match.sport.name);
    // Check if both teams exist in the teams array

    // Return true if at least one condition is met
    return sportExists;
  });

  const recentArticles = filteredArticles.slice(0, 5);

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
  if (recentArticles.length === 0) {
    return (
      <h2 className="text-red-500 text-center font-semibold py-10">
        No Articles On your Prefernces Based
      </h2>
    );
  }

  return (
    <>
      {recentArticles.map((article: any) => (
        <div
          key={article.id}
          className="w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden flex my-4"
        >
          <img
            src={article.thumbnail}
            alt="Article Thumbnail"
            className="w-1/4 h-48 object-cover object-center"
          />
          <div className="p-4 w-3/4">
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
            <Link key={article.id} to={`articles/${article.id}`}>
              <button className="bg-blue-500 text-white p-2 rounded-lg mt-1">
                Read more
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default PArticleListItems;
