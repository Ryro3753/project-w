import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs/internal/types';
import { pageEmit } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { ItemType } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { State } from 'src/app/store/reducer/reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
  animations: [
    trigger(
      'filterToggle', [
      transition(':enter', [
        style({ height: 0 }),
        animate('500ms', style({ height: 300 }))
      ]),
      transition(':leave', [
        style({ height: 300 }),
        animate('500ms', style({ height: 0 }))
      ])
    ],
    ),
  ]
})
export class ItemPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly itemService: ItemService) { }

  currentUser: User | undefined;

  allItems!: ItemType[];
  filteredItems!: ItemType[];
  shownItems!: ItemType[];

  currentPageIndexes!: pageEmit;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  itemImageBasePath = this.apiURL + '/images/ItemImages/';

  sidebar: boolean = true;
  selectedItem!: ItemType;

  filterToggle: boolean = false;

  filterName: string = '';
  filterCategory: string = '';
  filterType: string = '';
  filterTags: string = '';
  filterUsername: string = '';

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        this.readData(i.user.Id)
      }
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async readData(userId: string) {
    this.allItems = await this.itemService.getAllTraitsByUserId(userId);
    this.filteredItems = JSON.parse(JSON.stringify(this.allItems));
    this.shownItems = JSON.parse(JSON.stringify(this.filteredItems));
  }

  async addNewItem() {
    if (this.currentUser) {
      const newItem = await this.itemService.insertItemType({ UserId: this.currentUser.Id });
      this.allItems.unshift(newItem);
      this.filteredItems.unshift(newItem);
      this.filteredItems = JSON.parse(JSON.stringify(this.filteredItems));
    }
  }

  pageChange(page: pageEmit) {
    this.currentPageIndexes = page;
    this.shownItems = this.filteredItems.slice(page.firstIndex, page.lastIndex + 1);
  }

  itemSelect(itemType: ItemType, event: any) {
    if (event.which == 2) {
      window.open('/Items/' + itemType.Id, '_blank');
    }
    else if(event.which == 1) {
      this.sidebar = true;
      this.selectedItem = itemType;
    }
  }

  sideBarClosed() {
    this.sidebar = false;
  }

  filterToggleClick() {
    this.filterToggle = !this.filterToggle;
  }

  search() {
    this.filteredItems = this.allItems.filter(el => el.Name.includes(this.filterName) && el.Category.includes(this.filterCategory) && 
                    el.Type.includes(this.filterType) && el.Tags.includes(this.filterTags) && el.Username.includes(this.filterUsername));
  }

}


