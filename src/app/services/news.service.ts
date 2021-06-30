import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get<ResponseTopHeadlines>(`https://newsapi.org/v2/everything?q=tesla&from=2021-05-16&sortBy=publishedAt&apiKey=bdba368191394f01bd1667b4d25c8d53`);
  }
}
