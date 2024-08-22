import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useArticlesState } from "../../../context/articles/context";

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
  const { t } = useTranslation();

  if (articles === undefined || articles === null) {
    return <span>{t("load")}</span>;
  }

  if (isLoading) {
    return <span>{t("load")}</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (filteredArticles.length === 0) {
    return (
      <h2 className="text-gray-500 font-semibold px-10 py-10 text-center">
        No Articles Related to {sportName}
      </h2>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-5 rounded p-3">
      {filteredArticles
        ?.slice(Math.max(filteredArticles.length - 8, 0))
        .reverse()
        .map((article: any) => (
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
                  {t("Read_more")}
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ArticleListBySport;
