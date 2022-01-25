import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-abilities',
  templateUrl: './character-abilities.component.html',
  styleUrls: ['./character-abilities.component.css']
})
export class CharacterAbilitiesComponent implements OnInit {

  constructor() { }

  @Input() characterId!: number;

  ngOnInit(): void {
  }

}
