import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterClass } from 'src/app/models/class.model';
import { User } from 'src/app/models/common/user.model';
import { Race } from 'src/app/models/races.model';
import { ClassService } from 'src/app/services/class.service';
import { RaceService } from 'src/app/services/races.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-character-creation-page',
  templateUrl: './character-creation-page.component.html',
  styleUrls: ['./character-creation-page.component.css']
})
export class CharacterCreationPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
              readonly classService: ClassService,
              readonly raceService: RaceService,
              readonly alertService: AlertService,
              readonly activatedRoute: ActivatedRoute,
              readonly router: Router) { }

  clickedTab: number = 0;
  characterId!: number;

  currentUser: User | undefined;

  allRaces!: Race[];
  allClasses!: CharacterClass[];

  ngOnInit(): void {
    this.subscribes.push(this.activatedRoute.params.subscribe(i => {
      this.characterId = i['CharacterId'];
        }));
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if(i.user)
        await this.readData(i.user.Id)
    }));
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async readData(userId: string){
    this.allRaces = await this.raceService.getAllRacesByUserId(userId);
    this.allClasses = await this.classService.getAllClassesByUserId(userId);
  }

}
