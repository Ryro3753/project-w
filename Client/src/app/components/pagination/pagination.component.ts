import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { pageEmit } from 'src/app/models/common/common.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  constructor(readonly cdr: ChangeDetectorRef) { }

  @Input() pageSize : number = 10;
  @Output() pageClicked : EventEmitter<pageEmit> = new EventEmitter<pageEmit>();
  

  pageCount !: number;
  currentPage : number = 1;
  allPages !: number[];
  currentShownPages !: number[];
  lastPage !: number;

  pageCssClasses = 'pageLink';
  currentPageCssClasses =  'currentPage';

  ngOnInit(): void {
  }

  @Input() set data(data: any[]){
    if(!data || data.length == 0 || data == null)
      return;
    this.pageCount = Math.ceil(data.length / this.pageSize);
    this.currentPage = 1;
    this.allPages = [];
    for (let i = 0; i < this.pageCount; i++) {
      this.allPages.push(i + 1);
    }
    this.lastPage = this.allPages[this.allPages.length - 1];
    this.pageChange(1);
  }

  pageChange(page: number){
    this.currentShownPages = [];
    let iteration = page - 2;
    let overflow = 0;
    while(this.currentShownPages.length < 5 && overflow <= 10){
      if(iteration > 0 && iteration <= this.pageCount){
        this.currentShownPages.push(iteration);
      }
      overflow++;
      iteration++;
    }
    this.currentPage = page;
    const pages = {
      firstIndex: ((this.currentPage - 1) * this.pageSize), 
      lastIndex: (this.currentPage * this.pageSize) - 1,
    } as pageEmit;
    this.pageClicked.emit(pages);
  }

  next(){
    if(this.currentPage == this.lastPage)
      return;
    this.pageChange(this.currentPage + 1);
  }

  previous(){
    if(this.currentPage == 1)
    return;
    this.pageChange(this.currentPage - 1);
  }

}
