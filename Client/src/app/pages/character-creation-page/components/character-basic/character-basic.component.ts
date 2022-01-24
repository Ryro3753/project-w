import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterBasics, CharacterCreationRequest, UpdateCharacterRequest } from 'src/app/models/character.model';
import { CharacterClass } from 'src/app/models/class.model';
import { User } from 'src/app/models/common/user.model';
import { Race } from 'src/app/models/races.model';
import { CharacterService } from 'src/app/services/character.service';
import { ClassService } from 'src/app/services/class.service';
import { RaceService } from 'src/app/services/races.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-character-basic',
  templateUrl: './character-basic.component.html',
  styleUrls: ['./character-basic.component.css']
})
export class CharacterBasicComponent implements OnInit {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly characterService: CharacterService,
              readonly alertService: AlertService,
              readonly activatedRoute: ActivatedRoute,
              readonly raceService: RaceService,
              readonly classService: ClassService,
              readonly store: Store<{ state: State }>,) { }


  @Input() allRaces!: Race[];
  @Input() allClasses!: CharacterClass[];
  currentUser: User | undefined;

  @Output() characterCreated: EventEmitter<number> = new EventEmitter<number>();

  characterBasics!: CharacterBasics;
  currentcharacterId!: number;

  selectedClass!: number;
  selectedRace!: number;
  name!: string;  

  ngOnInit(): void {
    this.subscribes.push(this.activatedRoute.params.subscribe((i: any) => {
      this.currentcharacterId = i['CharacterId'];
    }));
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
      this.readCharacter(this.currentcharacterId, i.user.Id);
      }
    }));
  }



  async readCharacter(characterId: number, userId: string){
    this.characterBasics = await this.characterService.getCharacterCreationBasics(characterId,userId);
    this.selectedClass = this.characterBasics.ClassId;
    this.selectedRace = this.characterBasics.RaceId;
    this.name = this.characterBasics.Name;
  }



  async save(){
    if(!this.currentUser)
      return;
    if(this.currentcharacterId){
      const request = {
        CharacterId: this.currentcharacterId,
        ClassId: this.selectedClass,
        RaceId: this.selectedRace,
        Name: this.name
      } as UpdateCharacterRequest

      await this.characterService.updateCharacter(request);

      this.alertService.alert({alertInfo:{message:'Character Updated',type:'success',timeout:5000}});
    }
    else {
      const request = {
        Name: this.name,
        ClassId: this.selectedClass,
        RaceId: this.selectedRace,
        UserId: this.currentUser.Id
      } as CharacterCreationRequest

      const result = await this.characterService.createCharacter(request);
      this.characterCreated.emit(result.Id);
      this.alertService.alert({alertInfo:{message:'Character Created',type:'success',timeout:5000}});
    }
  }

}
