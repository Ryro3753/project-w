import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { pageEmit } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { Race, RaceDeleteRequest } from 'src/app/models/races.model';
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
    readonly raceService: RaceService,
    readonly alertService: AlertService) { }

  allRaces: Race[] | undefined;
  filteredRaces!: Race[];
  shownRaces!: Race[];
  currentUser: User | undefined;
  currentPageIndexes!: pageEmit;
  search: string = '';

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        await this.readData(i.user.Id);
      }
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  pageChange(page: pageEmit) {
    this.currentPageIndexes = page;
    this.shownRaces = this.filteredRaces.slice(page.firstIndex, page.lastIndex + 1);
  }

  async readData(userId: string) {
    this.allRaces = await this.raceService.getAllRacesByUserId(userId);
    this.filteredRaces = JSON.parse(JSON.stringify(this.allRaces));
    this.shownRaces = JSON.parse(JSON.stringify(this.filteredRaces));
  }

  searchClicked() {
    if (this.allRaces) {
      this.filteredRaces = this.allRaces.filter(i => i.Name.includes(this.search));
    }
  }

  async addNewRace() {
    if (this.currentUser && this.allRaces) {
      const newRace = await this.raceService.insertRace({ UserId: this.currentUser.Id });
      this.allRaces.unshift(newRace);
      this.filteredRaces.unshift(newRace);
      this.filteredRaces = JSON.parse(JSON.stringify(this.filteredRaces));
    }
  }

  async deleteRace(raceId: number) {
    if (!this.currentUser)
      return;

    const result = await this.raceService.deleteRace(raceId, this.currentUser.Id);
    if (result == true && this.allRaces) {
      this.allRaces = this.allRaces.filter(i => i.Id != raceId);
      this.filteredRaces = this.filteredRaces.filter(i => i.Id != raceId);
      this.filteredRaces = JSON.parse(JSON.stringify(this.filteredRaces));
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }
  }

}
