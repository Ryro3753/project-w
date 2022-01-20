import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemAttribute } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-attribute-list',
  templateUrl: './item-attribute-list.component.html',
  styleUrls: ['./item-attribute-list.component.css']
})
export class ItemAttributeListComponent implements OnInit {

  constructor() { }

  @Input() height: number = 150;
  @Input() attributes!: ItemAttribute[];
  @Output() attributesChange: EventEmitter<ItemAttribute[]> = new EventEmitter<ItemAttribute[]>();

  ngOnInit(): void {
  }

  removeAttribute(index: number){
    this.attributes.splice(index,1);
  }

}
