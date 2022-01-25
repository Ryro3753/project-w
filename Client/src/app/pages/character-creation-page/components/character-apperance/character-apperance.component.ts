import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CharacterApperance, UpdateCharacterApperanceRequest } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';
import { UploadService } from 'src/app/services/common/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-apperance',
  templateUrl: './character-apperance.component.html',
  styleUrls: ['./character-apperance.component.css']
})
export class CharacterApperanceComponent implements OnInit {

  constructor(readonly characterService: CharacterService,
              readonly uploadService: UploadService,
              readonly alertService: AlertService) { }

  @Input() characterId!: number;

  apperance!: CharacterApperance;

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  characterImageBasePath = this.apiURL + '/images/CharacterImages/';

  async ngOnInit(): Promise<void> {
    this.apperance = await this.characterService.getCharacterApperance(this.characterId);
    console.log(this.apperance);
  }

  async addImage(e: any) {
    if (this.apperance) {
      this.uploadService.uploadCharacterImage(e.target.files[0], this.apperance.CharacterId).toPromise().then(i => {
        this.apperance.HasImage = true;
      });
    }
  }

  async save(){
    const request = {
      CharacterId: this.apperance.CharacterId,
      Age: this.apperance.Age,
      Eyes: this.apperance.Eyes,
      Gender: this.apperance.Gender,
      Hair: this.apperance.Hair,
      Height: this.apperance.Height,
      Weight: this.apperance.Weight,
      Skin: this.apperance.Skin,
      Note: this.apperance.Note
    } as UpdateCharacterApperanceRequest;

    const result = await this.characterService.updateCharacterApperance(request);
    if (result)
      this.alertService.alert({ alertInfo: { message: 'Updated saved successfully', timeout: 5000, type: 'success' } })
    else
      this.alertService.alert({ alertInfo: { message: 'Something wrong have happend, please try again.', timeout: 5000, type: 'warning' } })

  }
}
