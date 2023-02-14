import {createReducer, on} from "@ngrx/store";
import { first } from "rxjs";
import {ArticleActions} from "../actions/articles.action";

export interface ArticleState {
  articles: any;
  loading: boolean;
  error: string;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: ''
}

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.loadArticles, (state) => ({
    ...state,
    loading: true
  })),

  on(ArticleActions.loadArticlesSuccess, (state, {articles}) => ({
    ...state,
    articles: articles,
    loading: false
  })),

  on(ArticleActions.loadArticlesFailure, (state, {error}) => ({
    ...state,
    error: error,
    loading: false
  })),

  //LOAD ONE ARTICLE
  on(ArticleActions.loadOneArticle, (state) => ({
    ...state,
    loading: true
  })),

  on(ArticleActions.loadOneArticleSuccess, (state, {article}) => ({
    ...state,
    article,
    loading: false
  })),

  on(ArticleActions.loadOneArticleFailure, (state, {error}) => ({
    ...state,
    loading: false
  })),

   //LOAD ONE ARTICLE
   on(ArticleActions.updateArticle, (state, {article}) => ({
    ...state,
    article: article,
    loading: true
   })),

   on(ArticleActions.updateArticleSuccess, (state, {article}) => ({
    ...state,
    article: state.articles.map((item: any) => item.id === article.id ? article : item ),
    loading: false
   })),

   on(ArticleActions.updateArticleFailure, (state, {error}) => ({
    ...state,
    error: error,
    loading: false
   }))
)
