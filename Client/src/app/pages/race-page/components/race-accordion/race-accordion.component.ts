import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Race } from 'src/app/models/races.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-race-accordion',
  templateUrl: './race-accordion.component.html',
  styleUrls: ['./race-accordion.component.css'],
  animations: [
    trigger(
      'detailsToggle', [
        transition(':enter', [
          style({height:0}),
          animate('150ms', style({ height:100}))
        ]),
        transition(':leave', [
          style({height:100}),
          animate('150ms', style({height:0}))
        ])
      ],
    ),
  ]
})
export class RaceAccordionComponent implements OnInit {

  constructor() { }

  @Input() race: Race | undefined;

  details: boolean = false;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  raceImageBasePath = this.apiURL + '/images/raceImages/';


  ngOnInit(): void {
  }

  detailsClick(){
    this.details = !this.details;
  }

}
