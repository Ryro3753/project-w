import { Component, Input, OnInit } from '@angular/core';
import { CharacterFeature } from 'src/app/models/character.model';

@Component({
  selector: 'app-inventory-panel',
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.css']
})
export class InventoryPanelComponent implements OnInit {

  constructor() { }

  @Input() characterFeatures!: CharacterFeature[];
  @Input() characterId!: number;

  ngOnInit(): void {
  }

}
