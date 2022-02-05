import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { Character } from 'src/app/models/character.model';
import { User } from 'src/app/models/common/user.model';
import { CharacterService } from 'src/app/services/character.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.css']
})
export class CharactersPageComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly characterService: CharacterService,
    readonly confirmationService: ConfirmationService,
    readonly alertService: AlertService,
    readonly router: Router) { }

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

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async readData(userId: string) {
    this.allCharacters = await this.characterService.getCharacters(userId);
  }

  async deleteCharacter(id: number){
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Character').toPromise().then(async res => {
      if(res){
        const isDeleted = await this.characterService.deleteCharacter(id);
        this.allCharacters = this.allCharacters.filter(i => i.Id != id);
        if(isDeleted){
          this.alertService.alert({alertInfo:{message:'Character successfully deleted', type:'success'}});
        }
        else
          this.alertService.alert({alertInfo:{message:'Something wrong happend, please try again later', type:'danger'}});
      }
    });
  }

  newCharacter(){
    this.router.navigateByUrl('/Character-Creation');
  }

}
