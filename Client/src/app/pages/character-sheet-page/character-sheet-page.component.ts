import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { CharacterAll, CharacterDetail } from 'src/app/models/character-sheet.model';
import { User } from 'src/app/models/common/user.model';
import { Feature } from 'src/app/models/feature.model';
import { TraitWithFeature } from 'src/app/models/traits.model';
import { FeatureService } from 'src/app/services/feature.service';
import { loadCharacterAll } from 'src/app/store/actions/character-sheet.action';
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
    readonly featureServices: FeatureService
    ) { }

    characterId!: number;
    currentUser: User | undefined;
    allTraits!: TraitWithFeature[];
    character!: CharacterAll;
    characterDetails!: CharacterDetail;


    allFeatures: Feature[] = [];
    validFeatures!: Feature[];

    pageLoad: boolean = false;

  ngOnInit(): void {
    this.subscribes.push(this.activatedRoute.params.subscribe((param: any) => {
      this.characterId = param['CharacterId'];
      this.readCharacterData();
    }));
    this.subscribes.push(this.store.select(i => i.state.user).subscribe((user: User | undefined) => {
      this.currentUser = user;
      this.readTraits();
    }))
    this.subscribes.push(this.store.select(i => i.state.characterAll).subscribe((character: CharacterAll | undefined) => {
      if(character){
        this.character = character;
        this.characterDetails = JSON.parse(JSON.stringify(this.character.Detail));
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
  }

  readTraits(){
    if(this.currentUser){
      this.store.dispatch(loadTraits({userId: this.currentUser.Id}));
      this.readValidFeatures();
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

}
