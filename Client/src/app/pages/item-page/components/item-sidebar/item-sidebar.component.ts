import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemType } from 'src/app/models/item.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-sidebar',
  templateUrl: './item-sidebar.component.html',
  styleUrls: ['./item-sidebar.component.css']
})
export class ItemSidebarComponent implements OnInit {

  constructor() { }

  @Input() item!: ItemType;
  @Output() closeClicked: EventEmitter<any> = new EventEmitter<any>();

  apiURL = environment.apiURL;
  noImagePath = this.apiURL + '/images/miscimages/no-image.svg';
  itemImageBasePath = this.apiURL + '/images/ItemImages/';

  ngOnInit(): void {
  }

  close(){
    this.closeClicked.emit();
  }

}
