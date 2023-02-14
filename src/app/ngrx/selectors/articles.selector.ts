import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ArticleState} from "../reducers/articles.reducer";

const articlesSelector = createFeatureSelector<ArticleState>('articles');

export const selectArticles = createSelector(
  articlesSelector,
  (state: any) => state.articles
);

export const selectOneArticle = createSelector(
  articlesSelector,
  (state: any) => state.article
);

export const loadingSelector = createSelector(
  articlesSelector,
  state => state.loading
);
