import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  headlinesPage = 0;

  currentCategory = '';
  pageCategory = 0;

  constructor( private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query);
  }

  getTopHeadlines(){
    this.headlinesPage++;
    return this.executeQuery<ResponseTopHeadlines>(`top-headlines/category/health/us.json`);
  }

  getTopHeadlinesCategory(category: string){
    if(this.currentCategory === category){
      this.pageCategory++;
    }
    else{
      this.currentCategory = category;
    }

    return this.executeQuery<ResponseTopHeadlines>(`top-headlines/category/${ category }/us.json`);
  }
}
