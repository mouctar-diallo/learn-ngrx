import {Component, OnInit, Output} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {select, Store} from "@ngrx/store";
import {ArticleActions} from "../../ngrx/actions/articles.action";
import {map, Observable} from "rxjs";
import {loadingSelector, selectArticles, selectOneArticle} from "../../ngrx/selectors/articles.selector";
import { Article } from 'src/app/models/article';
import { ArticleEditComponent } from './article-edit/article-edit.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private store: Store) {}

  @Output() added: boolean = false;
  @Output() edited: boolean = false;
  articles$: Observable<any> = this.store.pipe(select(selectArticles));
  loading$: Observable<boolean> = this.store.pipe(select(loadingSelector));
  // article$: Observable<any> = this.store.select((state: any) => state.articles.article);
  article$: Observable<any> = this.store.pipe(select(selectOneArticle));

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.store.dispatch(ArticleActions.loadArticles())
  }

  onEditArticle(article: any) {
    this.edited = true;
    this.store.dispatch(ArticleActions.loadOneArticle({id: article.id}));
  }

  remove(article: Article) {
    const article_id = Number(article.id);
    this.store.dispatch(ArticleActions.deleteArticle({id: article_id}));
    this.getArticles();
  }

  onAddArticle() {
    this.added = true;
  }
}
