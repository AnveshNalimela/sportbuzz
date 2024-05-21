// src/context/projects/actions.ts
import { API_ENDPOINT } from "../../config/constants";
export const fetchArticleById = async (dispatch: any, articleId: number) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ARTICLE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching articles with id:", error);
    dispatch({
      type: "FETCH_ARTICLE_FAILURE",
      payload: "Unable to load  articles with id",
    });
  }
};
