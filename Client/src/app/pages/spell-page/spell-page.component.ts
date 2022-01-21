import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { User } from 'src/app/models/common/user.model';
import { Spell } from 'src/app/models/spell.model';
import { SpellService } from 'src/app/services/spell.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-spell-page',
  templateUrl: './spell-page.component.html',
  styleUrls: ['./spell-page.component.css']
})
export class SpellPageComponent implements OnInit {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly spellService: SpellService,
    readonly router: Router,
    readonly confirmationService: ConfirmationService,
    readonly alertService: AlertService) { }

  currentUser: User | undefined;

  allSpells!: Spell[];
  filteredSpells!: Spell[];
  search!: string;

  ngOnInit(): void {
    this.subscribes.push(this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        await this.readData(i.user.Id);
      }
    }));
  }

  async addNewSpell() {
    if (this.currentUser && this.allSpells) {
      const newSpell = await this.spellService.insertSpell({ UserId: this.currentUser.Id });
      this.allSpells.unshift(newSpell);
      this.filteredSpells.unshift(newSpell);
    }
  }

  async readData(userId: string) {
    this.allSpells = await this.spellService.getAllSpellsByUserId(userId);
    this.filteredSpells = JSON.parse(JSON.stringify(this.allSpells));
  }

  searchClicked() {
    if (this.allSpells) {
      this.filteredSpells = this.allSpells.filter(i => i.Name.toLowerCase().includes(this.search.toLowerCase()));
    }
  }

  seeDetails(spellId: number, event: any) {
    if (event.which == 2) {
      window.open('/Spells/' + spellId, '_blank');
    }
    else if (event.which == 1) {
      this.router.navigateByUrl('/Spells/' + spellId);
    }
  }

  async deleteSpell(spellId: number) {
    if (!this.allSpells)
      return;
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Spell').toPromise().then(async res => {
      if (res && this.allSpells && this.currentUser) {
        const result = await this.spellService.deleteSpell(spellId, this.currentUser.Id)
        if (result) {
          this.alertService.alert({ alertInfo: { message: 'Spell successfully deleted', type: 'success', timeout: 3000 } });
          this.allSpells = this.allSpells.filter(i => i.Id != spellId);
          this.filteredSpells = this.filteredSpells.filter(i => i.Id != spellId);
        }
      }
    })
  }

}
