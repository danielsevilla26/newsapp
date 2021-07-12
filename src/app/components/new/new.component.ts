import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
@Input() new: Article;
@Input() indice: number;

  constructor() { }

  ngOnInit() {}

}
