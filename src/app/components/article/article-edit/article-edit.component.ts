import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleActions } from 'src/app/ngrx/actions/articles.action';
import { selectArticles } from 'src/app/ngrx/selectors/articles.selector';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnChanges {
  form: FormGroup | any;
  @Input() article: Article | any;
  @Input() edited: boolean = false;
  articles$: Observable<Article[]> = new Observable<Article[]>();

  constructor(private store: Store<Article>) {
    this.store = store;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      codeArticle: new FormControl(''),
      designation: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl('')
    });

    this.preloadForm(this.article);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('article' in changes) {
      this.ngOnInit();
    }
  }

  preloadForm(article: Article) {
    this.form.patchValue({
      id: article.id,
      codeArticle: article.codeArticle,
      designation: article.designation,
      price: article.price,
      quantity: article.quantity
    });
  }

  update() {
    this.article = this.form.value;
    this.store.dispatch(ArticleActions.updateArticle({id: this.article.id, article: this.article}));
    this.reloadArticles();
    this.edited = false;
  }

  reloadArticles() {
    this.articles$ = this.store.pipe(select(selectArticles));
    this.store.dispatch(ArticleActions.loadArticles())
  }

}
