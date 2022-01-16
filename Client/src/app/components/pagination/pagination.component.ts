import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input() pageSize : number = 10;
  

  pageCount !: number;
  currentPage : number = 1;
  allPages !: number[];
  currentShownPages !: number[];

  ngOnInit(): void {
  }

  @Input() set data(data: any[]){
    this.pageCount = Math.ceil(data.length / this.pageSize);
    this.currentPage = 1;
    this.allPages = [];
    for (let i = 0; i < this.pageCount; i++) {
      this.allPages.push(i + 1);
    }
  }

  pageChange(page: number){
    this.currentShownPages = [];
    let iteration = page - 2;
    let overflow = 0;
    while(this.currentShownPages.length < 5 && overflow <= 10){
      if(iteration > 0 && iteration <= this.pageCount){
        this.currentShownPages.push(iteration);
        overflow++;
        iteration++;
      }
    }
  }

}
