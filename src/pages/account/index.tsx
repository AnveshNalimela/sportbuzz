import React, { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { API_ENDPOINT } from "../../config/constants";
const AccountArticles = React.lazy(() => import("./Articles/AccountArticles"));
const PMatchList = React.lazy(() => import("./Matches/PMatchList"));
const Preferences = React.lazy(() => import("./preferences/preferences"));

const Account = () => {
  let [sports, setSports] = useState({});
  let [teams, setTeams] = useState({});
  const fetchPrefernces = async () => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the authorization token in the header
        },
      });
      const data = await response.json();
      const preferences = data.preferences;
      if (preferences) {
        setSports(preferences.sports);
        setTeams(preferences.teams);
        console.log(preferences, "are succesfully retrieved");
        console.log(sports, teams);
      }
    } catch (error) {
      console.log("Error fetching preferences:", error);
    }
  };
  useEffect(() => {
    fetchPrefernces();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="lg:text-left text-center text-2xl font-bold tracking-tight text-slate-700 mt-3 ml-3">
          Live Matches
        </h2>

        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <Preferences
              fetchPrefernces={fetchPrefernces}
              psports={sports}
              pteams={teams}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <PMatchList psports={sports} pteams={teams} />
        </Suspense>
      </ErrorBoundary>
      <div className="flex justify-between">
        <h2 className="text-center text-md-left text-2xl font-bold tracking-tight text-slate-700 mb-2 ml-3">
          Trending Articles
        </h2>
      </div>
      <div className="">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <AccountArticles psports={sports} pteams={teams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Account;
