import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { CharacterApperance } from 'src/app/models/character.model';
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
              readonly uploadService: UploadService) { }

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
      this.uploadService.uploadItemTypeImage(e.target.files[0], this.apperance.CharacterId).toPromise().then(i => {
        this.apperance.HasImage = true;
      });
    }
  }
}
