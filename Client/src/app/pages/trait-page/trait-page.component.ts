import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { pageEmit } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { Trait, TraitUpdateRequest, TraitWithFeature } from 'src/app/models/traits.model';
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
    readonly traitService: TraitsService,
    readonly router: Router,
    readonly activatedRoute: ActivatedRoute,
    readonly alertService: AlertService) { }

  currentUser: User | undefined;

  allTraits!: Trait[];
  filteredTraits!: Trait[];
  shownTraits!: Trait[];
  currentPageIndexes!: pageEmit;

  search!: string;
  selectedTraitId: number | undefined;


  ngOnInit(): void {
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        await this.readData(i.user.Id);
        const sub = this.activatedRoute.queryParams.subscribe(i => {
          this.readParams(i['Id']);
        });
        sub.unsubscribe();
      }
    }));
  }

  async readData(userId: string) {
    this.allTraits = await this.traitService.getAllTraitsByUserId(userId);
    this.filteredTraits = JSON.parse(JSON.stringify(this.allTraits));
    this.shownTraits = JSON.parse(JSON.stringify(this.filteredTraits));
  }

  pageChange(page: pageEmit) {
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

  searchClicked() {
    if (this.allTraits) {
      this.filteredTraits = this.allTraits.filter(i => i.Name.includes(this.search));
    }
  }

  traitClicked(trait: Trait) {
    const urlParams: Params = { 'Id': trait.Id };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: urlParams,
      queryParamsHandling: 'merge'
    });
    this.selectedTraitId = trait.Id;
  }

  readParams(id: number) {
    if (id == null || !id)
      return;
    if (this.allTraits.some(i => i.Id == id)) {
      this.selectedTraitId = id;
    }
    else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { 'Id': null },
        queryParamsHandling: 'merge'
      });
    }
  }


  async deleteTrait(traitId: number) {
    if (!this.currentUser)
    return;

  const result = await this.traitService.deleteTrait(traitId, this.currentUser.Id);
  if (result == true && this.allTraits) {
    this.allTraits = this.allTraits.filter(i => i.Id != traitId);
    this.filteredTraits = this.filteredTraits.filter(i => i.Id != traitId);
    this.filteredTraits = JSON.parse(JSON.stringify(this.filteredTraits));
    this.alertService.alert({ alertInfo: { message: 'Trait successfully deleted', type: 'success', timeout: 5000 } })
  }
  else {
    const error = result as any;
    this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
  }
  }

  async saveTrait(trait: TraitWithFeature) {
    const request = {
      Description: trait.Description,
      TraitId: trait.Id,
      Features: trait.Features,
      Name: trait.Name
    } as TraitUpdateRequest
    const updatedTrait = await this.traitService.updateTrait(request);

    const index = this.allTraits.findIndex(i => i.Id == updatedTrait.Id);
    this.allTraits[index] = updatedTrait;

    const indexFiltered = this.filteredTraits.findIndex(i => i.Id == updatedTrait.Id);
    if (indexFiltered != -1)
      this.filteredTraits[indexFiltered] = updatedTrait;

    const indexShown = this.shownTraits.findIndex(i => i.Id == updatedTrait.Id);
    if (indexShown != -1)
      this.shownTraits[indexShown] = updatedTrait;

    if (updatedTrait)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })
  }

}
