import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsResponse, ArticlesByCategoryAndPage, Article } from '../interfaces';
import { environment } from '../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private ArticlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor( private http: HttpClient) { }

  private executeQuery<T>(endpoint: string){
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadlines(){
    return this.getTopHeadlinesByCategory('business');
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false):Observable<Article[]>{
    if(loadMore){
      return this.getArticlesByCategory(category);
    }

    if(this.ArticlesByCategoryAndPage[category]){
      return of(this.ArticlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]>{
    if(Object.keys(this.ArticlesByCategoryAndPage).includes(category)){

    }else{
      this.ArticlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.ArticlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`top-headlines/category/${category}/us.json`)
    .pipe(
      map( ({ articles }) => {
        if(articles.length == 0) return this.ArticlesByCategoryAndPage[category].articles;

        this.ArticlesByCategoryAndPage[category] = {
          page: page,
          articles: [...this.ArticlesByCategoryAndPage[category].articles, ...articles]
        }

        return this.ArticlesByCategoryAndPage[category].articles;
      } )
    );
  }
}
