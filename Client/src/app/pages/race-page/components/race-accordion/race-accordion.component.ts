import { Component, Input, OnInit } from '@angular/core';
import { Race } from 'src/app/models/races.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-race-accordion',
  templateUrl: './race-accordion.component.html',
  styleUrls: ['./race-accordion.component.css']
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
