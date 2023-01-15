import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { FeatureRefresh } from 'src/app/events/features.popup.event';
import { CharacterAll, CharacterDetail } from 'src/app/models/character-sheet.model';
import { User } from 'src/app/models/common/user.model';
import { Feature } from 'src/app/models/feature.model';
import { SpellDetail } from 'src/app/models/spell.model';
import { TraitWithFeature } from 'src/app/models/traits.model';
import { MessageBusService } from 'src/app/services/common/messagebus.service';
import { FeatureService } from 'src/app/services/feature.service';
import { loadCharacterAll, loadSpellAll } from 'src/app/store/actions/character-sheet.action';
import { loadTraits } from 'src/app/store/actions/traits.action';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-character-sheet-page',
  templateUrl: './character-sheet-page.component.html',
  styleUrls: ['./character-sheet-page.component.css']
})
export class CharacterSheetPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];
  
  constructor(readonly store: Store<{ state: State }>,
    readonly activatedRoute: ActivatedRoute,
    readonly featureServices: FeatureService,
    readonly bus: MessageBusService
    ) {
     }

    characterId!: number;
    currentUser: User | undefined;
    allTraits!: TraitWithFeature[];
    allSpells!:SpellDetail[];
    character!: CharacterAll;
    characterDetails!: CharacterDetail;


    allFeatures: Feature[] = [];
    validFeatures!: Feature[];

    pageLoad: boolean = false;

  ngOnInit(): void {
      this.subscribes.push(this.bus.of(FeatureRefresh).subscribe(this.refreshFeature.bind(this)))
      this.subscribes.push(this.activatedRoute.params.subscribe((param: any) => {
      this.characterId = param['CharacterId'];
      this.readCharacterData();
    }));
    this.subscribes.push(this.store.select(i => i.state.user).subscribe((user: User | undefined) => {
      this.currentUser = user;
      this.readTraits();
      this.readSpells();
    }))
    this.subscribes.push(this.store.select(i => i.state.characterAll).subscribe((character: CharacterAll | undefined) => {
      if(character){
        this.character = JSON.parse(JSON.stringify(character));
        this.characterDetails = this.character.Detail;
        this.allFeatures = [];
        this.allFeatures.push(...this.character.Features.RaceFeatures);
        this.allFeatures.push(...this.character.Features.ClassFeatures);
        this.allFeatures.push(...this.character.Features.CharacterFeatures.map(i => i.Feature));
        this.readValidFeatures();
      }
    }))
    this.subscribes.push(this.store.select(i => i.state.traits).subscribe((traits: TraitWithFeature[] | undefined) => {
      if(traits){
        this.allTraits = traits;
        this.readValidFeatures();
      }
    }))
    this.subscribes.push(this.store.select(i => i.state.spells).subscribe((spells: SpellDetail[] | undefined) => {
      if(spells){
        this.allSpells = spells;
      }
    }))
  }

  readTraits(){
    if(this.currentUser){
      this.store.dispatch(loadTraits({userId: this.currentUser.Id}));
      this.readValidFeatures();
    }
  }

  readSpells(){
    if(this.currentUser){
      this.store.dispatch(loadSpellAll({userId:this.currentUser.Id}));
    }
  }

  readCharacterData(){
    if(this.characterId){
      this.store.dispatch(loadCharacterAll({characterId: this.characterId}));
      this.readValidFeatures();
    }
  }

  readValidFeatures(){
    if(this.allFeatures.length > 0 && this.allTraits){
      this.validFeatures = this.featureServices.readValidFeatures(this.allFeatures,this.allTraits);
      this.pageLoad = true;

    }
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  refreshFeature(featureRefresh:FeatureRefresh){
    this.character.Features.CharacterFeatures = featureRefresh.features;
    this.allFeatures = [];
    this.allFeatures.push(...this.character.Features.RaceFeatures);
    this.allFeatures.push(...this.character.Features.ClassFeatures);
    this.allFeatures.push(...featureRefresh.features.map(i => i.Feature));
    this.readValidFeatures();
  }

}
