import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../context/article/actions";
import { useArticleDispatch } from "../../context/article/context";
import ArticleDetails from "./ArticleDetails";

const Article = () => {
  const ArticleDispatch = useArticleDispatch();
  const article = useParams();
  const articleId = parseInt(article.articleID);

  useEffect(() => {
    fetchArticleById(ArticleDispatch, articleId);
  }, [ArticleDispatch]);
  return (
    <>
      <ArticleDetails />
    </>
  );
};

export default Article;
