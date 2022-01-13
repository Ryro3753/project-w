import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Race, RaceDetail } from 'src/app/models/races.model';
import { RaceService } from 'src/app/services/races.service';
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

  constructor(readonly raceService: RaceService) { }

  @Input() race: Race | undefined;

  detailsToggle: boolean = false;

  raceDetail: RaceDetail | undefined;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  raceImageBasePath = this.apiURL + '/images/raceImages/';


  ngOnInit(): void {
  }

  async detailsClick(){
    this.detailsToggle = !this.detailsToggle;
    if(!this.raceDetail && this.race){
      this.raceDetail = await this.raceService.getRaceDetail(this.race.Id);
    }
  }

}
