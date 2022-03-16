import { Component, Input, OnInit } from '@angular/core';
import { CharacterDescription } from 'src/app/models/character.model';

@Component({
  selector: 'app-description-panel',
  templateUrl: './description-panel.component.html',
  styleUrls: ['./description-panel.component.css']
})
export class DescriptionPanelComponent implements OnInit {

  constructor() { }

  @Input() characterDescription!: CharacterDescription;
  @Input() classColor!: string;

  ngOnInit(): void {
  }

  getHeaderStyle(){
    return {'border-color': this.classColor, 'color': this.classColor}
  }


}
