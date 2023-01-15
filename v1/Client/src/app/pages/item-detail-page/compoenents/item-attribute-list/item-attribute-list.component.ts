import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemAttribute } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-attribute-list',
  templateUrl: './item-attribute-list.component.html',
  styleUrls: ['./item-attribute-list.component.css']
})
export class ItemAttributeListComponent implements OnInit {

  constructor(readonly itemService: ItemService) { }

  @Input() height: number = 150;
  @Input() attributes!: ItemAttribute[];
  @Input() edit!: boolean;
  @Output() attributesChange: EventEmitter<ItemAttribute[]> = new EventEmitter<ItemAttribute[]>();

  itemAttributes!: string[];

  async ngOnInit(): Promise<void> {
    this.itemAttributes = await this.itemService.getItemAttributes();
  }

  removeAttribute(index: number){
    this.attributes.splice(index,1);
  }

}
