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
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-4">
        <h2 className="text-center lg:text-left text-2xl font-bold tracking-tight text-slate-700 mt-3 ml-3 md:mb-6 xs:mb-6">
          {t("Live_Matches")}
        </h2>
        {/* Preferences Section */}
        <ErrorBoundary>
          <Suspense fallback={<div className="suspense-loading">{t("load")}</div>}>
            <Preferences
              fetchPrefernces={fetchPrefernces}
              psports={sports}
              pteams={teams}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Main Content */}
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">{t("load")}</div>}>
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mx-4 lg:mx-10 mt-5">
            {/* Matches Section */}
            <div className="lg:col-span-6">
              <PMatchList psports={sports} pteams={teams} />
            </div>

            {/* Chatbot Section */}
            <div className="lg:col-span-2 border-2 border-slate-300 rounded-lg shadow-md p-4">
              <ChatbotUI />
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* Trending Articles Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-4 mt-6">
        <h2 className="text-center lg:text-left text-2xl font-bold tracking-tight text-slate-700 mb-2 ml-3">
          {t("Trending_Articles")}
        </h2>
      </div>

      <div className="mx-4 lg:mx-10">
        <ErrorBoundary>
          <Suspense fallback={<div className="suspense-loading">{t("load")}</div>}>
            <AccountArticles psports={sports} pteams={teams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Account;
