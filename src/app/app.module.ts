import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {ArticleComponent} from './components/article/article.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {InterceptorProvider} from "./components/_helpers/interceptor";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {reducers} from "./ngrx/reducers/reducers";
import {EffectsModule} from "@ngrx/effects";
import {Effects} from "./ngrx/effects/effects";
import { HeaderComponent } from './components/header/header.component';
import { ArticleEditComponent } from './components/article/article-edit/article-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleAddComponent } from './components/article/article-add/article-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HeaderComponent,
    ArticleEditComponent,
    ArticleAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(Effects),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App'
    }),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [InterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
