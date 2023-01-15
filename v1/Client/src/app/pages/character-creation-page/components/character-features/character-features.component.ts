import { Component, Input, OnInit } from '@angular/core';
import { CharacterFeature } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-features',
  templateUrl: './character-features.component.html',
  styleUrls: ['./character-features.component.css']
})
export class CharacterFeaturesComponent implements OnInit {

  constructor(readonly characterService: CharacterService) { }

  @Input() characterId!: number;
  @Input() note!: string;

  from: string = 'CharacterCreationFeatures';
  characterFeatures!: CharacterFeature[];

  async ngOnInit(): Promise<void> {
    this.characterFeatures = await this.characterService.getCharacterFeatures(this.characterId,this.note);
  }
}
