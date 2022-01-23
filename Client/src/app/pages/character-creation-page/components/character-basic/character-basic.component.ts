import { Component, Input, OnInit } from '@angular/core';
import { CharacterBasics } from 'src/app/models/character.model';
import { CharacterClass } from 'src/app/models/class.model';
import { User } from 'src/app/models/common/user.model';
import { Race } from 'src/app/models/races.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-basic',
  templateUrl: './character-basic.component.html',
  styleUrls: ['./character-basic.component.css']
})
export class CharacterBasicComponent implements OnInit {

  constructor(readonly characterService: CharacterService) { }


  @Input() allRaces!: Race[];
  @Input() allClasses!: CharacterClass[];
  @Input() currentUser: User | undefined;

  characterBasics!: CharacterBasics;
  currentcharacterId!: number;

  selectedClass!: number;
  selectedRace!: number;

  ngOnInit(): void {
  }

  @Input() set characterId(id: number){
    if(this.currentUser && id){
      this.currentcharacterId = id;
      this.readData(id, this.currentUser.Id);
    }
  }

  async readData(characterId: number, userId: string){
      this.characterBasics = await this.characterService.getCharacterCreationBasics(characterId,userId);
      this.selectedClass = this.characterBasics.ClassId;
      this.selectedRace = this.characterBasics.RaceId;
  }


}
