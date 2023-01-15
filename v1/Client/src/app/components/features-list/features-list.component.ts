import { Component, Input, OnInit } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.css'],
})
export class FeaturesListComponent implements OnInit {

  constructor() { }

  featureItems!: Feature[];
  @Input() width: number = 10;
  @Input() height: number = 150;

  cssClassesWithoutRequirement: string = 'list-group-item listItem';
  cssClassesWithRequirement: string =  this.cssClassesWithoutRequirement + ' listItemWithRequirements click';

  showRequirementsToggle : boolean[] = [];

  ngOnInit(): void {
  }

  showRequirements(feature: Feature, index: number) {
    if (feature.Requirements == null || !feature.Requirements || feature.Requirements.length == 0)
      return;
    this.showRequirementsToggle[index] = !this.showRequirementsToggle[index];
  }

  @Input() set features(items: Feature[]){
    this.featureItems = items;
    this.showRequirementsToggle.fill(false,0,this.showRequirementsToggle.length);
  }


}
