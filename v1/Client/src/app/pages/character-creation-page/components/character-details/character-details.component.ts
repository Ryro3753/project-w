import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterDescription } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  constructor(readonly characterService: CharacterService,
              readonly alertService: AlertService) { }

  @Input() characterId!: number;

  description!: CharacterDescription;

  async ngOnInit(): Promise<void> {
    this.description = await this.characterService.getCharacterDescription(this.characterId);
  }

  async save(){
    const result = await this.characterService.updateCharacterDescription(this.description);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })

  }

}
