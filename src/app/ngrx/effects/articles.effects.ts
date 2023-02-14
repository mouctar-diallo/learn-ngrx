import {Injectable} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {ArticleActions} from "../actions/articles.action";
import {mergeMap, map, catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import { Article } from "src/app/models/article";

@Injectable()
export class ArticlesEffects {

  constructor(private articleService: ArticleService, private actions$: Actions) {}

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticles),
      mergeMap(() =>
        this.articleService.getArticles().pipe(
          map((articles: any) => ArticleActions.loadArticlesSuccess({articles})),
          catchError((error: string) => of(ArticleActions.loadArticlesFailure({error: error})))
        )
      )
    )
  );

  getOne$ = createEffect( () =>
    this.actions$.pipe(
      ofType(ArticleActions.loadOneArticle),
      switchMap(({id}) =>
        this.articleService.getArticleByCode(id).pipe(
          map((article: Article) => ArticleActions.loadOneArticleSuccess({ article })),
          catchError(err => of(ArticleActions.loadOneArticleFailure({ error: err })))
        )
      )
    )
  );


  update$ = createEffect( () =>
    this.actions$.pipe(
      ofType(ArticleActions.updateArticle),
      switchMap(({id, article}) => 
      this.articleService.updateArticle(article, id).pipe(
          map((article: Article) => ArticleActions.updateArticleSuccess({ article })),
          catchError(err => of(ArticleActions.updateArticleFailure({ error: err })))
        )
      )
    )
  )
  
}
