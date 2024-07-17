import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticlesList = React.lazy(() => import("./articles/ArticlesList"));
const MatchList = React.lazy(() => import("./matches/MatchList"));

const Home = () => {
  return (
    <>
      <div className="flex justify-between text-center text-md-left px-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-700">
          Live Matches
        </h2>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchList />
        </Suspense>
      </ErrorBoundary>

      <div className="flex justify-between text-center text-md-left px-5">
        <h2 className=" text-2xl font-bold tracking-tight text-slate-700">
          Trending Articles
        </h2>
      </div>
      <div className="flex">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <ArticlesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Home;
