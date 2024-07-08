import React from "react";
import { Link } from "react-router-dom";
import { useArticlesState } from "../../../context/articles/context";

const PreferredArticleItem = ({ sports, teams, selected }) => {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  const sortedArticles = articles.sort((a, b) => {
    const endDateA = new Date(a.date).getTime();
    const endDateB = new Date(b.date).getTime();
    return endDateB - endDateA; // Sort in descending order
  });
  let filteredArticles;
  // Step 2: Take the first five elements from the sorted array

  if (selected) {
    // Feedback: Articles are early filtered only based on sports. Now, team-based filtering is also enabled.
    // filteredArticles = articles.filter(
    //   (article) => article.sport.name === selected
    // );
    filteredArticles = articles.filter(
      (article) =>
        article.sport.name === selected ||
        article.teams.some((team) => team.name === selected)
    );
  } else {
    filteredArticles = sortedArticles.filter((article) => {
      // Check if sportName exists in the sports array
      const sportExists = sports.some((sport) => sport === article.sport.name);

      // Check if any team name exists in the teams array
      const teamExists = article.teams.some((team) =>
        teams.includes(team.name)
      );

      // Return true if either sport or any team matches
      return sportExists || teamExists;
    });
  }

  const recentArticles = filteredArticles.slice(0, 8);

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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-2 rounded p-3">
      {recentArticles.map((article: any) => (
        <div
          key={article.id}
          className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden my-2 flex flex-col"
        >
          <img
            src={article.thumbnail}
            alt="Article Thumbnail"
            className="w-full h-48 object-cover object-center"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-center text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              {article.title}
            </h3>

            <p className="text-zinc-600 text-sm dark:text-zinc-400 mt-1 line-clamp-3 flex-grow">
              {article.summary}
            </p>
            <div className="flex justify-between w-full text-center mt-4 mb-4 ">
              <p className="text-zinc-600 dark:text-zinc-400 font-bold">
                {new Date(article.date).toLocaleString().split(",")[0]}
              </p>
              <p className="bg-slate-200 rounded px-3 py-1 font-semibold dark:text-zinc-400">
                {article.sport.name}
              </p>
            </div>
            <Link
              key={article.id}
              to={`articles/${article.id}`}
              className="mt-auto"
            >
              <button className="bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-lg w-full">
                Read more
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PreferredArticleItem;
