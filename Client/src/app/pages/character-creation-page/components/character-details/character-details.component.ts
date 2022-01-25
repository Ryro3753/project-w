import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  constructor(readonly characterService: CharacterService,
              readonly alertService: AlertService) { }

  @Input() characterId!: number;

  ngOnInit(): void {
  }

}
