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
          animate('200ms', style({ height:100}))
        ]),
        transition(':leave', [
          style({height:300}),
          animate('200ms', style({height:0}))
        ])
      ],
    ),
  ]
})
export class RaceAccordionComponent implements OnInit {

  constructor(readonly raceService: RaceService) { }

  @Input() race!: Race;

  detailsToggle: boolean = false;

  raceDetail: RaceDetail | undefined;

  deneme: string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  raceImageBasePath = this.apiURL + '/images/raceImages/';
  denemew(){
    console.log(this.deneme);
  }

  ngOnInit(): void {
  }

  async detailsClick(){
    this.detailsToggle = !this.detailsToggle;
    if(!this.raceDetail && this.race){
      this.raceDetail = await this.raceService.getRaceDetail(this.race.Id);
      console.log(this.raceDetail);
    }
  }

}
