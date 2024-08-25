import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticlesList = React.lazy(() => import("./articles/ArticlesList"));
const MatchList = React.lazy(() => import("./matches/MatchList"));

// Fetch your API_KEY

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between text-center text-md-left px-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          {t("Live_Matches")}
        </h2>
      </div>
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">{t("load")}</div>}
        >
          <MatchList />
        </Suspense>
      </ErrorBoundary>

      <div className="flex justify-between text-center text-md-left px-5">
        <h2 className=" text-2xl font-bold tracking-tight text-slate-700">
          {t("Trending_Articles")}
        </h2>
      </div>
      <div className="flex">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">{t("load")}</div>}
          >
            <ArticlesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Home;
