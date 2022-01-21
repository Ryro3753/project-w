import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html'
})
export class CustomListComponent implements OnInit {

  constructor() { }

  @Input() list!: string[];
  selecteds!: string[];

  ngOnInit(): void {
  }

  @Input() set selectedString(str:string){
    this.selecteds = str.split(',');
  }

  change(e:any){
    console.log(e);
  }


}
