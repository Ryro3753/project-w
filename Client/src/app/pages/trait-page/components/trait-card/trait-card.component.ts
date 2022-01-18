import { Component, Input, OnInit } from '@angular/core';
import { Trait } from 'src/app/models/traits.model';

@Component({
  selector: 'app-trait-card',
  templateUrl: './trait-card.component.html',
  styleUrls: ['./trait-card.component.css']
})
export class TraitCardComponent implements OnInit {

  constructor() { }

  @Input() Trait !: Trait;

  ngOnInit(): void {
  }

}
