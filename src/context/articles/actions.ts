// src/context/projects/actions.ts
import { API_ENDPOINT } from "../../config/constants";
export const fetchArticles = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_ARTICLES__REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load  articles",
    });
  }
};
