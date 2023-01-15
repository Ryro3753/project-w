import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/components/confirmation/confirmation.service';
import { Character } from 'src/app/models/character.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {

  constructor(readonly confirmationService: ConfirmationService,
              readonly Router: Router) { }

  @Input() character!: Character;
  @Output() deleteClicked : EventEmitter<number> = new EventEmitter<number>();

  apiURL = environment.apiURL;
  characterImageBasePath = this.apiURL + '/images/CharacterImages/';

  ngOnInit(): void {
  }

  deleteCharacter(){
    this.deleteClicked.emit(this.character.Id);
  }

  edit(){
    const url = '/Character-Creation/'  + this.character.Id
    this.Router.navigateByUrl(url);
  }

  view(){
    const url = '/Character-Sheet/'  + this.character.Id
    this.Router.navigateByUrl(url);
  }

}
