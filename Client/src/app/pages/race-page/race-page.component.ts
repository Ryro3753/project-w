import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { pageEmit } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { Race } from 'src/app/models/races.model';
import { RaceService } from 'src/app/services/races.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-race-page',
  templateUrl: './race-page.component.html',
  styleUrls: ['./race-page.component.css']
})
export class RacePageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly raceService: RaceService) { }

  allRaces: Race[] | undefined;
  filteredRaces!: Race[];
  shownRaces!: Race[];
  currentUser: User | undefined;
  currentPageIndexes!: pageEmit;
  search: string = '';

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user){
        await this.refreshData(i.user.Id);
      }
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  pageChange(page: pageEmit){
    this.currentPageIndexes = page;
    this.shownRaces = this.filteredRaces.slice(page.firstIndex, page.lastIndex+1);
  }

  async refreshData(userId: string){
    this.allRaces = await this.raceService.getAllRacesByUserId(userId);
    this.filteredRaces = JSON.parse(JSON.stringify(this.allRaces));
    this.shownRaces = JSON.parse(JSON.stringify(this.filteredRaces));
  }

  searchClicked(){
    if(this.allRaces){
      this.filteredRaces = this.allRaces.filter(i => i.Name.includes(this.search));
    }
  }

  async addNewRace(){
    if(this.currentUser && this.allRaces){
      const newRace = await this.raceService.insertRace({UserId: this.currentUser.Id});
      this.allRaces.unshift(newRace);
      this.filteredRaces.unshift(newRace);
      this.filteredRaces = JSON.parse(JSON.stringify(this.filteredRaces));
    }
  }

}
