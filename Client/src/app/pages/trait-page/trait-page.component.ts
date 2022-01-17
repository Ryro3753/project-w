import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { pageEmit } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { Trait } from 'src/app/models/traits.model';
import { TraitsService } from 'src/app/services/traits.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-trait-page',
  templateUrl: './trait-page.component.html',
  styleUrls: ['./trait-page.component.css']
})
export class TraitPageComponent implements OnInit {

  subscribes: SubscriptionLike[] = [];
  
  constructor(readonly store: Store<{ state: State }>,
              readonly traitService: TraitsService) { }

  currentUser: User | undefined;

  allTraits!: Trait[];
  filteredTraits!: Trait[];
  shownTraits!: Trait[];
  currentPageIndexes!: pageEmit;


  selectedTraitId: number | undefined;

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        await this.readData(i.user.Id);
      }
    });
    this.subscribes.push(sub);
  }

  async readData(userId: string){
    this.allTraits = await this.traitService.getAllTraitsByUserId(userId);
    this.filteredTraits = JSON.parse(JSON.stringify(this.allTraits));
    this.shownTraits = JSON.parse(JSON.stringify(this.filteredTraits));
  }

  pageChange(page: pageEmit){
    this.currentPageIndexes = page;
    this.shownTraits = this.filteredTraits.slice(page.firstIndex, page.lastIndex + 1);
  }

  async addNewTrait() {
    if (this.currentUser && this.allTraits) {
      const newTrait = await this.traitService.insertTrait({ UserId: this.currentUser.Id });
      this.allTraits.unshift(newTrait);
      this.filteredTraits.unshift(newTrait);
      this.filteredTraits = JSON.parse(JSON.stringify(this.filteredTraits));
    }
  }

}
