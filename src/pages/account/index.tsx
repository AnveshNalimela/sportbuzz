import { t } from "i18next";
import React, { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { API_ENDPOINT } from "../../config/constants";
import ChatbotUI from "./ChatbotUI";
const AccountArticles = React.lazy(() => import("./Articles/AccountArticles"));
const PMatchList = React.lazy(() => import("./Matches/PMatchList"));
const Preferences = React.lazy(() => import("./preferences/preferences"));

const Account = () => {
  const [sports, setSports] = useState({});
  const [teams, setTeams] = useState({});
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
          {t("Live_Matches")}
        </h2>

        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">{t("load")}</div>}
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
        <Suspense
          fallback={<div className="suspense-loading">{t("load")}</div>}
        >
          <div className="grid grid-cols-8 mx-10 mt-5">
            <div className="col-span-6">
              <PMatchList psports={sports} pteams={teams} />
            </div>
            <div className="col-span-2 border-2 border-slate-300 rounded-lg shadow-md ml-4 mt-2">
              <ChatbotUI />
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>

      <div className="flex justify-between">
        <h2 className="text-center text-md-left text-2xl font-bold tracking-tight text-slate-700 mb-2 ml-3">
          {t("Trending_Articles")}
        </h2>
      </div>
      <div className="">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">{t("load")}</div>}
          >
            <AccountArticles psports={sports} pteams={teams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Account;
