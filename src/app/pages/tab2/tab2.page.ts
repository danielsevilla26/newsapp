import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {
  @ViewChild(IonSegment) segment: IonSegment;

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor(private newsService: NewsService){

  }

  ngAfterViewInit(){
    this.segment.value = this.categories[0];
    this.loadNews(this.segment.value);
  }

  changeCategory(event){
    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadNews(category: string){
    
    this.newsService.getTopHeadlinesCategory( category )
    .subscribe( resp => {
      this.news.push(...resp.articles);
    } )
  }

}
