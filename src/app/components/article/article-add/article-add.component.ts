import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleActions } from 'src/app/ngrx/actions/articles.action';
import { selectArticles } from 'src/app/ngrx/selectors/articles.selector';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  added: boolean = false;
  form: FormGroup | any;
  @Input() addArticle: Article | any;
  articles$: Observable<Article[]> = new Observable<Article[]>();

  constructor(public store: Store<Article>) {
    this.store = store;
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      codeArticle: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });
  }

  get valid() { return this.form.controls; }

  add() {
    if (this.form.invalid) {
      alert("formulaire non valide");
      return
    }

    this.addArticle = this.form.value;
    this.store.dispatch(ArticleActions.addArticle({ article: this.addArticle}));
    this.reloadArticles();
    this.added = true
  }

  reloadArticles() {
    this.articles$ = this.store.pipe(select(selectArticles));
    this.store.dispatch(ArticleActions.loadArticles())
  }

}
