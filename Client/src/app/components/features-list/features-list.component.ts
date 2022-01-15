import { Component, Input, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.css']
})
export class FeaturesListComponent implements OnInit {

  constructor() { }

  @Input() features !: Feature[];
  @Input() width : number = 10;
  @Input() height : number = 150;

  ngOnInit(): void {
  }

}
