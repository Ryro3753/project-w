import { Component, Input, OnInit } from '@angular/core';
import { CharacterApperance } from 'src/app/models/character.model';

@Component({
  selector: 'app-apperance-panel',
  templateUrl: './apperance-panel.component.html',
  styleUrls: ['./apperance-panel.component.css']
})
export class ApperancePanelComponent implements OnInit {

  constructor() { }

  @Input() characterApperance!: CharacterApperance;
  @Input() classColor!: string;

  ngOnInit(): void {
  }

  getHeaderStyle(){
    return {'border-color': this.classColor, 'color': this.classColor}
  }

}
