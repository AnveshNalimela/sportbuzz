import { GoogleGenerativeAI } from "@google/generative-ai";
import { t } from "i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GEMINI_API_KEY } from "../../config/constants";
import { useArticleState } from "../../context/article/context";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ArticleDetails = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Summarize using AI");
  const [summary, setSummary] = useState(""); // State to hold the summarized article
  const state = useArticleState();
  const { article, isLoading, isError, errorMessage } = state;

  // Navigate back to the appropriate route
  const goBack = () => {
    const token = localStorage.getItem("authToken") ?? "";
    navigate(token ? "/account" : "/");
  };

  // Function to summarize the article using AI
  const summarizeAI = async () => {
    setStatus("AI is summarizing the article for you...");

    try {
      const summarizationPrompt = `Summarize the following article in under 200 words: ${JSON.stringify(
        article
      )}`;

      const result = await model.generateContentStream(summarizationPrompt);

      let newSummary = "";
      for await (const chunk of result.stream) {
        const chunkText = await chunk.text(); // Corrected to await chunk.text()
        newSummary += chunkText;
        setSummary(newSummary.trim()); // Update summary state
      }

      setStatus("Summarized successfully!"); // Update status after completion
    } catch (error) {
      console.error("Error summarizing the article:", error);
      setStatus("Error summarizing the article");
    }
  };

  // Handling loading, error, and empty article states
  if (!article) {
    return <div>{t("Article_not_found!")}</div>;
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-800">
        {t("Article_is_Loading..")}
      </div>
    );
  }

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-800">
      <img
        className="w-full h-64 object-cover object-center"
        src={article.thumbnail}
        alt={article.title}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          {article.title}
        </h2>
        <p className="text-lg font-semibold text-green-400 dark:text-zinc-400 mt-2">
          {summary || article.summary}{" "}
          {/* Display AI-generated summary if available */}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          {article.content}
        </p>
        <div className="flex flex-wrap items-center mt-4">
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
            {article.sport.name}
          </p>
          <p className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2 ml-4">
            Date: {new Date(article.date).toLocaleString().split(",")[0]}
          </p>
          {article.teams.map((team) => (
            <p
              key={team.id}
              className="text-sm bg-zinc-300 text-zinc-800 px-4 py-2 rounded hover:bg-zinc-400 font-semibold text-zinc-600 dark:text-zinc-400 mb-2 ml-4"
            >
              {team.name}
            </p>
          ))}
        </div>

        <button
          onClick={goBack}
          className="text-lg bg-green-300 hover:bg-green-500 px-4 py-1 text-center w-full h-10 rounded mx-1 mt-3"
        >
          {t("Go_Home")}
        </button>
        <p className="w-full text-lg text-center my-2 px-4">{summary}</p>
        <button
          onClick={summarizeAI}
          className="text-lg bg-green-300 hover:bg-green-500 px-4 py-1 text-center w-full h-10 rounded mx-1 mt-3"
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default ArticleDetails;
