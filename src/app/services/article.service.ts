import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl + `/articles`);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.baseUrl + `/articles/${id}`);
  }

  deleteArticle(id: number) {
    return this.http.delete(this.baseUrl + `/articles/${id}`);
  }

  updateArticle(article: Article, id: number): Observable<Article> {
    return this.http.put<Article>(this.baseUrl + `/articles/${id}`, article);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl + '/articles', article);
  }
}
