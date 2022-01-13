import { Component, Input, OnInit } from '@angular/core';
import { Race } from 'src/app/models/races.model';

@Component({
  selector: 'app-race-accordion',
  templateUrl: './race-accordion.component.html',
  styleUrls: ['./race-accordion.component.css']
})
export class RaceAccordionComponent implements OnInit {

  constructor() { }

  @Input() race: Race | undefined;

  ngOnInit(): void {
  }

}
