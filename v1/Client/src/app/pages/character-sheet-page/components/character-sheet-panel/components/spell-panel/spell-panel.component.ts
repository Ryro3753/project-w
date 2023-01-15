import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CharacterFeature } from 'src/app/models/character.model';
import { Feature } from 'src/app/models/feature.model';
import { SpellDetail } from 'src/app/models/spell.model';

@Component({
  selector: 'app-spell-panel',
  templateUrl: './spell-panel.component.html',
  styleUrls: ['./spell-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpellPanelComponent implements OnInit {

  constructor() { }

  features!: Feature[];
  spells!: SpellDetail[];
  @Input() allSpells!: SpellDetail[];
  @Input() characterId!: number;

  ngOnInit(): void {
  }

  @Input() set validFeatures(features: Feature[]){
    this.features = features;
    this.readSpells();
  }

  readSpells(){
    if(!this.allSpells)
      return;
    this.spells = [];
    this.features.filter(i => i.Section == 'Spell' && i.Type == 'Gain').forEach(e => {
      const spellIndex = this.allSpells.findIndex(i => i.Name.toLowerCase() == e.Value.toLowerCase());
      if(spellIndex != -1)
        this.spells.push(this.allSpells[spellIndex]);
    })
    this.spells = [...new Set(this.spells)];
  }

}
