import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { SharePopupCloseEvent, SharePopupEvent, SharePopupUsernameEvent } from 'src/app/events/share.popup.event';
import { ShareRequest } from 'src/app/models/common/common.model';
import { User } from 'src/app/models/common/user.model';
import { SpellDetail, SpellUpdateRequest } from 'src/app/models/spell.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { SpellService } from 'src/app/services/spell.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-spell-detail-page',
  templateUrl: './spell-detail-page.component.html',
  styleUrls: ['./spell-detail-page.component.css']
})
export class SpellDetailPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly store: Store<{ state: State }>,
    readonly activatedRoute: ActivatedRoute,
    readonly spellService: SpellService,
    readonly alertService: AlertService,
    readonly router: Router,
    readonly confirmationService: ConfirmationService,
    readonly bus: MessageBusService) {
      this.subscribes.push(this.bus.of(SharePopupUsernameEvent).subscribe(this.sharePopupResponse.bind(this)));
     }

  currentUser: User | undefined;
  spellId!: number;
  spellDetail!: SpellDetail

  edit: boolean = false;

  spellLevels!: any;
  spellComponents!: string[];
  spellSchools!: string[];
  spellRanges!: string[];
  spellCastingTypes!: string[];

  selectedComponents: string[] = [];

  ngOnInit(): void {
    this.subscribes.push(this.activatedRoute.params.subscribe(i => this.spellId = i['spellId']));
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        const result = await this.spellService.getSpell(this.spellId, i.user.Id);
        if ((result as any).error == "No spell found") {
          this.alertService.alert({ alertInfo: { message: 'No spell found', type: 'danger', timeout: 7000 } });
          this.router.navigateByUrl('/Spells');
        }
        else {
          this.spellDetail = result;
          if (this.spellDetail.Components != '')
            this.selectedComponents = this.spellDetail.Components.split(',');
        }
      }
    });
    this.subscribes.push(sub);
    this.spellLevels = this.spellService.getSpellLevels();
    this.spellComponents = this.spellService.getSpellComponents();
    this.spellSchools = this.spellService.getSpellSchools();
    this.spellRanges = this.spellService.getSpellRanges();
    this.spellCastingTypes = this.spellService.getSpellCastingType();
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async save() {
    if (!this.spellDetail)
      return;
    const request = {
      Id: this.spellDetail.Id,
      Name: this.spellDetail.Name,
      Level: this.spellDetail.Level,
      School:this.spellDetail.School,
      CastingType: this.spellDetail.CastingType,
      CastingTime: this.spellDetail.CastingTime,
      CastingDescription: this.spellDetail.CastingType == 'Reaction' || this.spellDetail.CastingType == 'Special' ? this.spellDetail.CastingDescription : '',
      Components: this.selectedComponents.join(','),
      ComponentsDescription: this.spellDetail.ComponentsDescription,
      Concentration: this.spellDetail.Concentration,
      Ritual: this.spellDetail.Ritual,
      Range: this.spellDetail.Range,
      Mana: this.spellDetail.Mana,
      Duration: this.spellDetail.Duration,
      Description: this.spellDetail.Description
    } as SpellUpdateRequest;

    const result = await this.spellService.updateSpell(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })
  }

  share() {
    if (this.spellDetail)
    this.bus.publish(new SharePopupEvent('spellId:' + this.spellDetail.Id.toString()));
  }

  async sharePopupResponse(event: SharePopupUsernameEvent) {
    if (!this.spellDetail || event.to !== 'spellId:' + this.spellDetail.Id.toString())
      return;
    const request = {
      ObjectId: this.spellDetail.Id,
      Username: event.username
    } as ShareRequest;
    const result = await this.spellService.shareSpell(request);
    if (result == true) {
      this.bus.publish(new SharePopupCloseEvent());
      this.alertService.alert({ alertInfo: { message: 'This spell successfully shared with ' + event.username, type: 'success', timeout: 5000 } });
    }
    else {
      const error = result as any;
      this.alertService.alert({ alertInfo: { message: error.error, type: 'warning', timeout: 5000 } })
    }
  }

  async deleteSpell() {
    if (!this.spellDetail)
      return;
    await this.confirmationService.confirm('Confirm', 'Do you confirm to delete this Spell').toPromise().then(async res => {
      if (res && this.spellDetail && this.currentUser) {
        const result = await this.spellService.deleteSpell(this.spellDetail.Id, this.currentUser.Id)
        if (result) {
          this.alertService.alert({ alertInfo: { message: 'Spell successfully deleted', type: 'success', timeout: 3000 } });
          this.router.navigateByUrl('/Spells')
        }
      }
    })
  }

}
