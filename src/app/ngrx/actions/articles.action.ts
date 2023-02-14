import {createAction, props} from "@ngrx/store";
import { Article } from "src/app/models/article";


// GET ALL ARTICLES
export const loadArticles = createAction(
  '[articles] load articles'
);

export const loadArticlesSuccess = createAction(
  '[articles] load articles success',
  props<{articles: Article[]}>()
);

export const loadArticlesFailure = createAction(
  '[articles] load articles Failed',
  props<{error: string}>()
);

// GET ONE ARTICLE
export const loadOneArticle = createAction(
  '[article] loading article by id',
  props<{id: number}>()
);

export const loadOneArticleSuccess = createAction(
  '[article] article loaded successfully',
  props<{ article: Article }>()
);

export const loadOneArticleFailure = createAction(
  '[article] load article failed',
  props<{error: string}>()
);

// UPDATE ARTICLE
export const updateArticle = createAction(
  '[article] updating article',
  props<{id: number, article: Article}>()
);

export const updateArticleSuccess = createAction(
  '[article] article updated successfully',
  props<{article: Article}>()
);

export const updateArticleFailure = createAction(
  '[article] update article failed',
  props<{ error: string}>()
);


export const ArticleActions = {
  loadArticles, loadArticlesSuccess, loadArticlesFailure,
  loadOneArticle, loadOneArticleSuccess, loadOneArticleFailure,
  updateArticle, updateArticleSuccess, updateArticleFailure
}
