import React from "react";
import { Link } from "react-router-dom";
import { useArticlesState } from "../../../context/articles/context";
// In ArticleListBySport component:

interface ArticleListBySportProps {
  sportName: string;
}

const ArticleListBySport: React.FC<ArticleListBySportProps> = ({
  sportName,
}) => {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const articlesList = articles;
  const filteredArticles = articlesList.filter(
    (article) => article.sport.name === sportName
  );

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
  if (filteredArticles.length === 0) {
    <h2 className="text-gray-500 font-semibold px-10 py-10 text-center">
      No Articles Related to {sportName}
    </h2>;
  }
  return (
    <>
      {filteredArticles
        ?.slice(Math.max(filteredArticles.length - 5, 0))
        .reverse()
        .map((article: any) => (
          <div
            key={article.id}
            className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden flex my-4"
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

export default ArticleListBySport;
