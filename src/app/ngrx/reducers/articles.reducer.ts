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
   })),


   // ADD ARTICLE
   on(ArticleActions.addArticle, (state, {article}) => {

    const articleExist: any = state.articles.find((item: any) => item.codeArticle === article.codeArticle);
    return (articleExist) ?  {... state, loading: false} : {... state, article: article, loading: false}
    // if(articleExist) {
    //   return {... state, loading: false};
    // }
    // else {
    //   return {... state, article: article, loading: false};
    // }

   }),

   on(ArticleActions.addArticleSuccess, (state, {article}) => ({
    ...state,
    article: article,
    loading: false
   })),

   on(ArticleActions.addArticleFailure, (state, {error}) => ({
    ...state,
    error: error,
    loading: false
   })),

   // DELETE ARTICLE
   on(ArticleActions.deleteArticle, (state, {id}) => ({
    ...state,
    loading: true
   })),

   on(ArticleActions.deleteArticleSuccess, (state) => ({
    ...state,
    loading: false
   })),

   on(ArticleActions.deleteArticleFailure, (state, {error}) => ({
    ...state,
    error: error,
    loading: false
   })),
)
