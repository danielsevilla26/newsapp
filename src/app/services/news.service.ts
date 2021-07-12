import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get<ResponseTopHeadlines>(`https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`);
  }
}
