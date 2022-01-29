import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { User } from 'src/app/models/common/user.model';
import { CharacterService } from 'src/app/services/character.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.css']
})
export class CharactersPageComponent implements OnInit {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly characterService: CharacterService) { }

  currentUser: User | undefined;

  allCharacters!: Character[];

  ngOnInit(): void {
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        this.readData(i.user.Id);
      }
    }));
  }

  async readData(userId: string) {
    this.allCharacters = await this.characterService.getCharacters(userId);
    console.log(this.allCharacters)
  }

}
